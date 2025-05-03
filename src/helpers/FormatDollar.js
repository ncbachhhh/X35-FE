// Hàm quy đổi tiền tệ
function formatDollar(value) {
  value = Number(value) || 0;

  // Làm tròn xuống đến đơn vị đồng (không thập phân)
  let formatted = Math.round(value).toString();

  // Thêm dấu chấm phân cách hàng nghìn
  formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm ký hiệu VNĐ
  return formatted + ".000" + "VND";
}

export default formatDollar;
