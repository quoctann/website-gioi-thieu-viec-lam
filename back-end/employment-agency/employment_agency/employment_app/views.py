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


# Phương thức trả ra next và previous link đính kèm mỗi response
def next_and_previous(request, query):
    next = None
    previous = None
    result_per_page = settings.REST_FRAMEWORK['PAGE_SIZE']
    total_pages = 1
    current = request.query_params.__getitem__('page')

    if query.count() > int(result_per_page):
        total_pages = math.ceil(query.count() / int(result_per_page))

    if int(current) + 1 <= total_pages:
        next = request.build_absolute_uri('/?page=' + str(int(current) + 1))

    if int(current) - 1 > 0:
        previous = request.build_absolute_uri('/?page=' + str(int(current) - 1))

    return [next, previous]


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


class ViecLamViewSet(viewsets.ViewSet,
                     generics.ListAPIView):
    queryset = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO)
    serializer_class = ViecLamSerializer
    pagination_class = ViecLamPagination

    # Override generic để lấy chi tiết nha_tuyen_dung
    def retrieve(self, request, pk=None):
        queryset = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO).select_related(
            'nha_tuyen_dung__nguoi_dung')
        vieclam = get_object_or_404(queryset, pk=pk)
        serializer = ViecLamSerializer(vieclam)
        return Response(serializer.data)

    # Lọc các việc làm theo ngành nghề, bằng cấp, kỹ năng, kinh nghiệm được gửi lên kèm request
    @action(methods=['get'], detail=False, url_path='loc-dieu-kien')
    def get_filter(self, request):
        if request.query_params.__contains__('career') or \
                request.query_params.__contains__('degree') or \
                request.query_params.__contains__('experience') or \
                request.query_params.__contains__('skill'):

            career = request.query_params.__getitem__('career')
            degree = request.query_params.__getitem__('degree')
            experience = request.query_params.__getitem__('experience')
            skill = request.query_params.__getitem__('skill')

            queryset = self.queryset \
                .filter(trang_thai_viec_lam=ViecLam.DANG_MO,
                        nganh_nghe__id=career,
                        bang_cap__id=degree,
                        kinh_nghiem__id=experience,
                        ky_nang__id=skill)\
                .select_related('nha_tuyen_dung__nguoi_dung')

            res = next_and_previous(request, queryset)

            return JsonResponse({
                'count': queryset.count(),
                'next': res[0],
                'previous': res[1],
                'result': list(queryset.values("id", "nha_tuyen_dung_id", "tieu_de", "luong", "nha_tuyen_dung__ten_cong_ty", "noi_dung"))
            })
        else:
            return Response({"invalid request": "need valid 'career', 'degree', 'experience', 'skill', as request parameters to filter on database"},
                            status.HTTP_400_BAD_REQUEST)


class NhaTuyenDungViewSet(viewsets.ViewSet,
                          generics.ListAPIView,
                          generics.RetrieveAPIView):
    queryset = NhaTuyenDung.objects.filter(doi_xet_duyet=False)
    serializer_class = NhaTuyenDungSerializer

    # API tìm kiếm gần đúng nhà tuyển dụng theo tên
    # /nha-tuyen-dung/search/?name=tên-nhà-tuyển-dụng&page=số
    @action(methods=['get'], detail=False, url_path='tim-kiem-theo-ten')
    def search_by_name(self, request):
        if request.query_params.__contains__('name') and request.query_params.__contains__('page'):
            query = NhaTuyenDung.objects.filter(
                ten_cong_ty__icontains=request.query_params.__getitem__('name'),
                doi_xet_duyet=False)
            res = next_and_previous(request, query)

            return JsonResponse({
                'count': query.count(),
                'next': res[0],
                'previous': res[1],
                'result': list(query.values())
            })
        return Response({"invalid request": "need valid 'name' and 'page' as request parameters to search on database"},
                        status.HTTP_400_BAD_REQUEST)


class UngTuyenViewSet(viewsets.ViewSet,
                      generics.ListAPIView,
                      generics.CreateAPIView):
    queryset = UngTuyen.objects.all()
    serializer_class = UngTuyenSerializer

    # API kiểm tra ứng viên đã ứng tuyển việc làm này chưa, nhận vào 2 req params
    # /ung-tuyen/hop-le/?ung-vien-id=số&viec-lam-id=số
    @action(methods=['get'], detail=False, url_path='hop-le')
    def valid_request(self, request):
        if request.query_params.__contains__('ung-vien-id') and request.query_params.__contains__('viec-lam-id'):
            uv_id = request.query_params.__getitem__('ung-vien-id')
            vl_id = request.query_params.__getitem__('viec-lam-id')
            # Dữ liệu gửi lên: { 'viec_lam': 'số', 'ung_vien': 'số' }
            query = UngTuyen.objects.filter(viec_lam_id=vl_id, ung_vien_id=uv_id)

            # Nếu đã ứng tuyển rồi thì ko ứng tuyển nữa
            if query.__len__() == 0:
                return Response({'valid': True}, status.HTTP_200_OK)
            else:
                return Response({'valid': False}, status.HTTP_200_OK)

        else:
            return Response({"invalid request": "need 'ung-vien-id' and 'viec-lam-id' as request parameters"},
                            status.HTTP_400_BAD_REQUEST)


class DanhGiaNhaTuyenDungViewSet(viewsets.ViewSet):
    queryset = DanhGiaNhaTuyenDung.objects.all()
    serializer_class = DanhGiaNhaTuyenDungSerializer(many=True)

    @action(methods=['get'], detail=False, url_path='chi-tiet')
    def get_rating_by_hiring(self, request):
        if request.query_params.__contains__('hiring-id') and request.query_params.__contains__('page'):
            query = DanhGiaNhaTuyenDung.objects.filter(nha_tuyen_dung_id=request.query_params.__getitem__('hiring-id'))
            serializer = DanhGiaNhaTuyenDungSerializer(query, many=True)
            data = serializer.data
            res = next_and_previous(request, query)

            return JsonResponse({
                'count': query.count(),
                'next': res[0],
                'previous': res[1],
                'result': data
            })
        return Response(
            {"invalid request": "need valid 'hiring-id' and 'page' as request parameters to search on database"},
            status.HTTP_400_BAD_REQUEST)


# API để lấy thông tin client_id, client_secret xin token chứng thực (đăng nhập)
class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status.HTTP_200_OK)
