# Tập tin này để xử lý request và trả về các response (tương tự controller trong
# MVC, là thành phần Views trong MVT)
import math

from django.http import JsonResponse
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from django.conf import settings

from .serializers import *


# Đăng ký user (tích hợp OAuth2)
# Sử dụng ViewSet để tự cấu hình thay vì các lớp view được hiện thực sẵn
# Sử dụng generics.CreateAPIView để hiện thực các phương thức create của viewset
# Sử dụng generics.RetrieveAPIView để lấy thông tin 1 user thông qua id
# Để ràng buộc chỉ user đã đăng nhập mới lấy được thông tin ta ghi đè lại phương
# thức get_permission
class NguoiDungViewSet(viewsets.ViewSet, generics.CreateAPIView):
    # Phương thức để trả về swagger ko lỗi (do swagger không hỗ trợ nested
    # serializer -> hiển thị dấu "." trong tên.trường_nested bị lỗi)
    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []
        return super().get_parsers()

    # Chỉ định câu truy vấn
    queryset = NguoiDung.objects.filter(is_active=True)
    # Chỉ định lớp serializer
    serializer_class = NguoiDungSerializer
    parser_classes = [MultiPartParser]

    # Chỉ định quyền user đã đăng nhập
    def get_permissions(self):
        # Chỉ riêng đối với thao tác get data user hiện tại phải chứng thực
        if self.action == 'get_current-user':
            return [permissions.IsAuthenticated()]
        # Thao tác như đăng ký ko cần chứng thực
        return [permissions.AllowAny()]

    # Tạo API get dữ liệu user sau khi đã chứng thực (đã đăng nhập)
    @action(methods=['get'], detail=False, url_path='hien-tai')
    def get_current_user(self, request):
        # print(request)
        return Response(self.serializer_class(request.user).data,
                        status.HTTP_200_OK)


class PhucLoiViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = PhucLoi.objects.all()
    serializer_class = PhucLoiSerializer
    pagination_class = None


class KinhNghiemViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = KinhNghiem.objects.all()
    serializer_class = KinhNghiemSerializer
    pagination_class = None


class NganhNgheViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = NganhNghe.objects.all()
    serializer_class = NganhNgheSerializer
    pagination_class = None


class KyNangViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = KyNang.objects.all()
    serializer_class = KyNangSerializer
    pagination_class = None


class BangCapViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = BangCap.objects.all()
    serializer_class = BangCapSerializer
    pagination_class = None


class ViecLamPagination(PageNumberPagination):
    page_size = 6


class ViecLamViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO)
    serializer_class = ViecLamSerializer
    pagination_class = ViecLamPagination

    # Nếu có query param gửi lên để lọc thì lọc trả ra kết quả
    def get_queryset(self):
        posts = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO)

        # Có param nào thì filter theo param đó, lưu ý giá trị gửi lên là id
        career = self.request.query_params.get('nganh-nghe')
        degree = self.request.query_params.get('bang-cap')
        experience = self.request.query_params.get('kinh-nghiem')
        skill = self.request.query_params.get('ky-nang')

        if career is not None:
            posts = posts.filter(nganh_nghe=int(career))

        if degree is not None:
            posts = posts.filter(bang_cap=int(degree))

        if experience is not None:
            posts = posts.filter(kinh_nghiem=experience)

        if skill is not None:
            posts = posts.filter(ky_nang=skill)

        return posts

    # Override generic để lấy chi tiết nha_tuyen_dung
    def retrieve(self, request, pk=None):
        queryset = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO).select_related(
            'nha_tuyen_dung__nguoi_dung')
        vieclam = get_object_or_404(queryset, pk=pk)
        serializer = ViecLamSerializer(vieclam)
        return Response(serializer.data)


class NhaTuyenDungViewSet(viewsets.ViewSet, generics.ListAPIView,generics.RetrieveAPIView):
    serializer_class = NhaTuyenDungSerializer
    queryset = NhaTuyenDung.objects.filter(doi_xet_duyet=False)

    # Nếu có query param là search thì tiến hành query tìm kiếm ntd, không thì trả ra tất cả
    def get_queryset(self):
        hiring = NhaTuyenDung.objects.filter(doi_xet_duyet=False)

        search = self.request.query_params.get('search')
        if search is not None:
            hiring = hiring.filter(ten_cong_ty__icontains=search)

        return hiring

    # API trả ra tất cả bài viết (tin tuyển dụng việc làm) đang mở của một ntd cụ thể (id)
    @action(methods=['get'], detail=True, url_path='viec-lam')
    def get_posts(self, request, pk):
        posts = NhaTuyenDung.objects.get(pk=pk).vieclam_set.filter(trang_thai_viec_lam=ViecLam.DANG_MO)

        # Nhận vào req params (nếu có) để tìm tên việc làm đang mở
        search = request.query_params.get('search')
        if search is not None:
            posts = posts.filter(tieu_de__icontains=search)

        return Response(ViecLamSerializer(posts, many=True).data,
                        status=status.HTTP_200_OK)

    # Lấy các bài đánh giá của một nhà tuyển dụng
    @action(methods=['get'], detail=True, url_path='danh-gia')
    def get_ratings(self, request, pk):
        ratings = DanhGiaNhaTuyenDung.objects.filter(nha_tuyen_dung_id=pk)

        return Response(DanhGiaNhaTuyenDungSerializer(ratings, many=True).data, status=status.HTTP_200_OK)


class UngTuyenViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = UngTuyen.objects.all()
    serializer_class = UngTuyenSerializer

    # Gọi khi có uv nộp đơn, hoặc ntd gửi off, tạo bản ghi mới, rq data bao gồm: việc làm id, ứng viên id, người gửi (uv/ntd)
    def create(self, request):
        uv_id = request.data.get('ung_vien')
        vl_id = request.data.get('viec_lam')
        uv2ntd = request.data.get('ung_vien_nop_don')
        check = UngTuyen.objects.filter(ung_vien_id=uv_id, viec_lam_id=vl_id)
        if len(check) > 0:
            return Response(data={'error': 'resource already exists, cannot overwrite it'}, status=status.HTTP_409_CONFLICT)

        if uv2ntd is not None:
            res = UngTuyen.objects.create(ung_vien_id=uv_id, viec_lam_id=vl_id, ung_vien_nop_don=uv2ntd)
        else:
            res = UngTuyen.objects.create(ung_vien_id=uv_id, viec_lam_id=vl_id)

        return Response(UngTuyenSerializer(res).data, status=status.HTTP_201_CREATED)


# API để lấy thông tin client_id, client_secret xin token chứng thực (đăng nhập)
class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status.HTTP_200_OK)
