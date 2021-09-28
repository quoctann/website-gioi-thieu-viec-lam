# Tập tin này để xử lý request và trả về các response (tương tự controller trong
# MVC, là thành phần Views trong MVT)
import datetime

from django.db.models import Count, Q
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

from .serializers import *


# Đăng ký user (tích hợp OAuth2)
# Sử dụng ViewSet để tự cấu hình thay vì các lớp view được hiện thực sẵn
# Sử dụng generics.CreateAPIView để hiện thực các phương thức create của viewset
# Sử dụng generics.RetrieveAPIView để lấy thông tin 1 user thông qua id
# Để ràng buộc chỉ user đã đăng nhập mới lấy được thông tin ta ghi đè lại phương
# thức get_permission
class NguoiDungViewSet(viewsets.ViewSet, generics.CreateAPIView):
    # Chỉ định câu truy vấn
    queryset = NguoiDung.objects.filter(is_active=True)
    # Chỉ định lớp serializer
    serializer_class = NguoiDungSerializer
    parser_classes = [MultiPartParser]

    # Chỉ định quyền user đã đăng nhập
    def get_permissions(self):
        # Chỉ riêng đối với thao tác get data user hiện tại phải chứng thực
        if self.action == 'hien_tai':
            return [permissions.IsAuthenticated()]
        # Thao tác như đăng ký ko cần chứng thực
        return [permissions.AllowAny()]

    # Đăng ký người dùng, check một số điều kiện rồi gọi super của generics
    def create(self, request, *args, **kwargs):
        # Dùng lại code của generics create api. Parse req data thành dict
        nguoi_dung = self.get_serializer(data=request.data)
        # Dữ liệu được serialize ra hợp lệ
        nguoi_dung.is_valid(raise_exception=True)
        # Lưu xuống csdl
        self.perform_create(nguoi_dung)

        vai_tro = request.data.get('vai_tro')
        if vai_tro is not None:
            if vai_tro == NguoiDung.NHA_TUYEN_DUNG:
                NhaTuyenDung.objects.create(nguoi_dung_id=nguoi_dung.data.get('id'))
            if vai_tro == NguoiDung.UNG_VIEN:
                UngVien.objects.create(nguoi_dung_id=nguoi_dung.data.get('id'))

        headers = self.get_success_headers(nguoi_dung.data)
        return Response(nguoi_dung.data, status=status.HTTP_201_CREATED, headers=headers)

    # Tạo API get dữ liệu user sau khi đã chứng thực (đã đăng nhập)
    @action(methods=['get'], detail=False, url_path='hien-tai')
    def hien_tai(self, request):
        # Request gửi lên chỉ có header chứa token và đối tượng của NguoiDung
        vai_tro = request.user.vai_tro
        # Vai trò nào thì query trả ra thêm thông tin trong vai trò đó
        if vai_tro == NguoiDung.UNG_VIEN:
            query = UngVien.objects.get(pk=request.user.id)
            data = UngVienSerializer(query, context={'request': request}).data
        elif vai_tro == NguoiDung.NHA_TUYEN_DUNG:
            query = NhaTuyenDung.objects.get(pk=request.user.id)
            data = NhaTuyenDungSerializer(query, context={'request': request}).data
        elif vai_tro == NguoiDung.QUAN_LY:
            query = QuanLy.objects.get(pk=request.user.id)
            data = QuanLySerializer(query, context={'request': request}).data
        else:
            data = None

        if data is not None:
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(self.serializer_class(request.user, context={'request': request}).data,
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
        viec_lam = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO).order_by("-ngay_tao")

        # Có param nào thì filter theo param đó, lưu ý giá trị gửi lên là id
        nganh_nghe = self.request.query_params.get('nganh-nghe')
        bang_cap = self.request.query_params.get('bang-cap')
        kinh_nghiem = self.request.query_params.get('kinh-nghiem')
        ky_nang = self.request.query_params.get('ky-nang')

        if nganh_nghe is not None:
            viec_lam = viec_lam.filter(nganh_nghe=nganh_nghe)

        if bang_cap is not None:
            viec_lam = viec_lam.filter(bang_cap=bang_cap)

        if kinh_nghiem is not None:
            viec_lam = viec_lam.filter(kinh_nghiem=kinh_nghiem)

        if ky_nang is not None:
            viec_lam = viec_lam.filter(ky_nang=ky_nang)

        return viec_lam

    # Override generic để lấy chi tiết nha_tuyen_dung
    def retrieve(self, request, pk=None):
        queryset = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO).select_related(
            'nha_tuyen_dung__nguoi_dung')
        vieclam = get_object_or_404(queryset, pk=pk)
        serializer = ViecLamSerializer(vieclam)
        return Response(serializer.data)

    # Lấy dữ liệu công việc gợi ý dựa trên ngành nghề của ứng viên (id gửi lên)
    @action(methods=['get'], detail=True, url_path='goi-y')
    def goi_y(self, request, pk):
        viec_lam = ViecLam.objects.filter(trang_thai_viec_lam=ViecLam.DANG_MO)
        ung_vien = UngVien.objects.get(pk=pk)
        nganh_nghe = ung_vien.nganh_nghe.first()
        if nganh_nghe is not None:
            viec_lam = viec_lam.filter(nganh_nghe__id=nganh_nghe.id)
        else:
            viec_lam = viec_lam.filter(trang_thai_viec_lam=ViecLam.DANG_MO)[:5]
        return Response(self.serializer_class(viec_lam, many=True).data, status=status.HTTP_200_OK)


class NhaTuyenDungViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    serializer_class = NhaTuyenDungSerializer
    queryset = NhaTuyenDung.objects.filter(doi_xet_duyet=False)

    # Nếu có query param là search thì tiến hành query tìm kiếm ntd, không thì trả ra tất cả
    def get_queryset(self):
        ntd = NhaTuyenDung.objects.filter(doi_xet_duyet=False)

        tim_kiem = self.request.query_params.get('tim-kiem')
        if tim_kiem is not None:
            ntd = ntd.filter(ten_cong_ty__icontains=tim_kiem)

        return ntd

    # API trả ra tất cả bài viết (tin tuyển dụng việc làm) đang mở của một ntd cụ thể (id)
    @action(methods=['get'], detail=True, url_path='viec-lam')
    def bai_viet(self, request, pk):
        bai_viet = NhaTuyenDung.objects.get(pk=pk).vieclam_set.filter(trang_thai_viec_lam=ViecLam.DANG_MO)

        # Nhận vào req params (nếu có) để tìm tên việc làm đang mở
        tim_kiem = request.query_params.get('tim-kiem')
        if tim_kiem is not None:
            bai_viet = bai_viet.filter(tieu_de__icontains=tim_kiem)

        return Response(ViecLamSerializer(bai_viet, many=True).data,
                        status=status.HTTP_200_OK)

    # Lấy danh sách nhà tuyển dụng đang đợi xét duyệt cho admin xử lý
    @action(methods=['get'], detail=False, url_path='doi-xet-duyet')
    def doi_xet_duyet(self, request):
        query = NhaTuyenDung.objects.filter(doi_xet_duyet=True)
        data = NhaTuyenDungSerializer(query, many=True).data

        return Response(data, status.HTTP_200_OK)

    # Duyệt nhà tuyển dụng, tài khoản sẵn sàng hoạt động
    @action(methods=['patch'], detail=True, url_path='duyet-nha-tuyen-dung')
    def duyet_nha_tuyen_dung(self, request, pk):
        quan_ly_id = request.data.get('quanLyId')
        try:
            nha_tuyen_dung = NhaTuyenDung.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response({'request khong hop le': 'id nha tuyen dung khong ton tai'},
                            status.HTTP_400_BAD_REQUEST)
        else:
            nha_tuyen_dung.doi_xet_duyet = False
            nha_tuyen_dung.save()
            # Cập nhật log của quản lý
            quan_ly = QuanLy.objects.get(pk=quan_ly_id)
            quan_ly.log = quan_ly.log + "%s: Duyet tai khoan nha tuyen dung ID: %s\n" % (datetime.datetime.now(), pk)
            quan_ly.save()

            # Trả về response hoàn chỉnh
            return Response({"da cap nhat": "tai khoan nha tuyen dung da duoc xet duyet"}, status=status.HTTP_200_OK)

    # Lấy các bài đánh giá của một nhà tuyển dụng
    @action(methods=['get'], detail=True, url_path='danh-gia')
    def danh_gia(self, request, pk):
        danh_gia = DanhGiaNhaTuyenDung.objects.filter(nha_tuyen_dung_id=pk)

        return Response(DanhGiaNhaTuyenDungSerializer(danh_gia, many=True).data,
                        status=status.HTTP_200_OK)


class UngTuyenViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = UngTuyen.objects.all()
    serializer_class = UngTuyenSerializer

    # Gọi khi có uv nộp đơn, hoặc ntd gửi off, tạo bản ghi mới, rq data bao gồm: việc làm id, ứng viên id, người gửi (uv/ntd)
    def create(self, request):
        uv_id = request.data.get('ung_vien')
        vl_id = request.data.get('viec_lam')
        trang_thai_ho_so = request.data.get('trang_thai_ho_so')

        check = UngTuyen.objects.filter(ung_vien_id=uv_id, viec_lam_id=vl_id)
        # Nếu như ứng viên ứng tuyển một công việc mà nhà tuyển dụng gửi cho thì chỉ cập nhật trạng thái thôi
        cap_nhat = check.first()
        if cap_nhat.ung_vien_nop_don is False:
            cap_nhat.trang_thai_ho_so = UngTuyen.DUOC_CHAP_NHAN
            cap_nhat.save()
            return Response({"cap nhat thanh cong": "chap nhan de nghi viec lam cua nha tuyen dung thanh cong"},
                            status.HTTP_200_OK)

        # Nếu như ứng viên ứng tuyển công việc đã ứng tuyển rồi thì res 409
        if len(check) > 0 and trang_thai_ho_so is None:
            return Response(data={'loi': 'tai nguyen da ton tai, khong the ghi de'},
                            status=status.HTTP_409_CONFLICT)
        elif len(check) > 0 and trang_thai_ho_so is not None:
            cap_nhat = UngTuyen.objects.get(ung_vien_id=uv_id, viec_lam_id=vl_id)
            cap_nhat.trang_thai_ho_so = trang_thai_ho_so
            cap_nhat.save()
            return Response({"cap nhat": "nha tuyen dung cap nhat trang thai thanh cong"},
                            status.HTTP_200_OK)

        if trang_thai_ho_so is not None:
            res = UngTuyen.objects.create(ung_vien_id=uv_id,
                                          viec_lam_id=vl_id,
                                          ung_vien_nop_don=False,
                                          trang_thai_ho_so=trang_thai_ho_so)
        else:
            res = UngTuyen.objects.create(ung_vien_id=uv_id, viec_lam_id=vl_id)

        return Response(UngTuyenSerializer(res).data, status=status.HTTP_201_CREATED)

    # Lấy danh sách việc làm ứng viên nộp đơn cho nhà tuyển dụng và đợi duyệt
    @action(methods=['get'], detail=True, url_path='ung-vien-doi-duyet')
    def ung_vien_doi_duyet(self, request, pk):
        danh_sach = UngTuyen.objects.filter(trang_thai_ho_so=UngTuyen.CHO_XU_LY,
                                            ung_vien_nop_don=True,
                                            viec_lam__nha_tuyen_dung_id=pk)
        # print(danh_sach.values())
        data = self.serializer_class(danh_sach, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)

    # Lấy danh sách các việc làm nhà tuyển dụng gửi cho ứng viên và đợi chấp nhận
    @action(methods=['get'], detail=True, url_path='de-xuat-viec-lam')
    def de_xuat_viec_lam(self, request, pk):
        danh_sach = UngTuyen.objects.filter(trang_thai_ho_so=UngTuyen.CHO_XU_LY,
                                            ung_vien_nop_don=False,
                                            ung_vien_id=pk)
        data = self.serializer_class(danh_sach, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)

    # Thống kê theo quý (nếu có truyền vào) ứng viên nộp đơn vào những ngành nghề nào
    @action(methods=['get'], detail=False, url_path='thong-ke')
    def thong_ke(self, request):
        # Lọc những ứng viên nộp đơn
        truy_van = UngTuyen.objects.filter(ung_vien_nop_don=True)
        # Lấy request params
        quy = int(request.query_params.get('quy'))
        nam = int(request.query_params.get('nam'))
        # Lọc ra danh sách ngành nghề
        data = {}
        nganh_nghe = NganhNghe.objects.all()
        # Quý 0 thì thống kê theo năm gửi vào
        if quy == 0:
            truy_van = UngTuyen.objects.filter(ung_vien_nop_don=True, ngay_ung_tuyen__year=nam)
            for nghe in nganh_nghe:
                data[nghe.ten] = truy_van.filter(viec_lam__nganh_nghe__id=nghe.id).count()
            return Response(data, status.HTTP_200_OK)
        if quy == 1:
            ngay_bat_dau = datetime.date(nam, 1, 1)
            ngay_ket_thuc = datetime.date(nam, 3, 31)
        elif quy == 2:
            ngay_bat_dau = datetime.date(nam, 4, 1)
            ngay_ket_thuc = datetime.date(nam, 6, 30)
        elif quy == 3:
            ngay_bat_dau = datetime.date(nam, 7, 1)
            ngay_ket_thuc = datetime.date(nam, 9, 30)
        elif quy == 4:
            ngay_bat_dau = datetime.date(nam, 10, 1)
            ngay_ket_thuc = datetime.date(nam, 12, 31)
        else:
            return Response({"thieu query param": "can query param 'quy' va 'nam' de truy van"},
                            status.HTTP_400_BAD_REQUEST)

        # Lọc các đơn ứng tuyển được nộp trong quý được truyền vào ở trên
        truy_van = truy_van.filter(ngay_ung_tuyen__range=(ngay_bat_dau, ngay_ket_thuc))

        # Lọc ra số đơn ứng tuyển ứng với ngành nghề, đếm số lượng
        for nghe in nganh_nghe:
            data[nghe.ten] = truy_van.filter(viec_lam__nganh_nghe__id=nghe.id).count()
        return Response(data, status.HTTP_200_OK)


class UngVienViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = UngVien.objects.all()
    serializer_class = UngVienSerializer


# API để lấy thông tin client_id, client_secret xin token chứng thực (đăng nhập)
class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status.HTTP_200_OK)
