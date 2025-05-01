// Hàm quy đổi tiền tệ
function formatDollar(value) {
  value = Number(value) || 0;
  // Chuyển số thành chuỗi với 2 chữ số sau dấu thập phân (ví dụ: "1000.00")
  let formatted = value.toFixed(2);

  // Tách phần nguyên và phần thập phân
  let parts = formatted.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1];

  // Chèn dấu chấm làm phân cách hàng nghìn
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return "$" + integerPart + "," + decimalPart;
}

export default formatDollar;
