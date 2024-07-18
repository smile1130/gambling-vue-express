$("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

$(function() {
    const rowsPerPage = 30;
    const rows = $('#table1 tbody tr');
    const rowsCount = rows.length;
    const pageCount = Math.ceil(rowsCount / rowsPerPage); // tránh số thập phân
    const numbers = $('#numbers');
    // Tạo phân trang.
    for (var i = 0; i < pageCount; i++) {
        numbers.append('<li class="page-item"><a class="page-link">' + (i + 1) + '</a></li>');
    }

    // Đánh dấu liên kết trang đầu tiên là hoạt động.
    $('#numbers li:first-child a').addClass('active text-white');

    // Hiển thị tập hợp các hàng đầu tiên.
    displayRows(1);

    // Khi nhấp vào phân trang.
    $('#numbers li a').click(function(e) {
        var $this = $(this);

        e.preventDefault();

        // Xóa lớp đang hoạt động khỏi các liên kết.
        $('#numbers li a').removeClass('active text-white');

        // Thêm lớp đang hoạt động vào liên kết hiện tại.
        $this.addClass('active text-white');

        // Hiển thị các hàng tương ứng với ID trang đã nhấp.
        displayRows($this.text());
    });

    // Hàm hiển thị các hàng cho một trang cụ thể.
    function displayRows(index) {
        var start = (index - 1) * rowsPerPage;
        var end = start + rowsPerPage;

        // Ẩn tất cả các hàng.
        rows.hide();

        // Hiển thị các hàng thích hợp cho trang này.
        rows.slice(start, end).show();
    }

    function hidePagination(params) {
        const prev = $('#numbers .page-item:gt(5)').hide();
    }
    hidePagination();

    $('.table1 .previous').click(function(e) {
        e.preventDefault();
        const prev = $('#numbers .page-item .active').parent().prev().children();
        const lastSelect = prev.parent().next().children();
        lastSelect.removeClass('active text-white');
        prev.addClass('active text-white');
        if (Number(prev.text()) != "") {
            displayRows(prev.text());
        }
    });
    $('.table1 .next').click(function(e) {
        e.preventDefault();
        const next = $('#numbers .page-item .active').parent().next().children();
        const lastSelect = next.parent().prev().children();
        lastSelect.removeClass('active text-white');
        next.addClass('active text-white');
        if (Number(next.text()) != 0) {
            displayRows(next.text());
        }
        if (Number(next.text()) > 6) {
            showPagination(Number(next.text()))
        } else {

        }
    });
});