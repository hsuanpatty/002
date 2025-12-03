// 讓手機點日期不跳出鍵盤（一定要放最前面）
$("#date-range, #date-range-sm").attr("readonly", true);

function initDateRange(inputId) {
    $(inputId).daterangepicker({
        autoApply: true,
        locale: {
            format: "YYYY/MM/DD",
            separator: " - ",
            applyLabel: "確定",
            cancelLabel: "取消",
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: [
                "1 月","2 月","3 月","4 月","5 月","6 月",
                "7 月","8 月","9 月","10 月","11 月","12 月"
            ]
        }
    });

    const pickerInstance = $(inputId).data("daterangepicker");
    const $container = $(inputId).closest(".input-group");

    // 初始化先隱藏父容器
    $container.hide();
    $container.attr("aria-expanded", "false");

    function updateMonthTitle(picker) {
        const leftMonthMoment = picker.leftCalendar.month;
        const rightMonthMoment = picker.rightCalendar.month;

        picker.container
            .find(".drp-calendar.left .month")
            .text(leftMonthMoment.year() + " 年 " + (leftMonthMoment.month() + 1) + " 月");

        picker.container
            .find(".drp-calendar.right .month")
            .text(rightMonthMoment.year() + " 年 " + (rightMonthMoment.month() + 1) + " 月");
    }

    $(inputId).on("show.daterangepicker showCalendar.daterangepicker", function (ev, picker) {
        setTimeout(() => updateMonthTitle(picker), 10);

        // 手風琴邏輯：如果已經打開就收起，沒打開就展開
        const isExpanded = $container.attr("aria-expanded") === "true";

        // 收起所有（如果你有多個同類容器）
        $(".input-group").not($container).stop(true,true).slideUp(600).attr("aria-expanded","false");

        if (!isExpanded) {
            // 展開自己
            $container.stop(true,true).slideDown(600, "swing").attr("aria-expanded", "true");
        } else {
            // 收起自己
            $container.stop(true,true).slideUp(600, "swing").attr("aria-expanded", "false");
        }

        // 點擊日期 → 收起自己
        picker.container.find("td.available")
            .off("click")
            .on("click", function () {
                picker.hide();
                $container.stop(true,true).slideUp(600, "swing").attr("aria-expanded", "false");
            });
    });

    // 初始化更新一次月份
    setTimeout(() => updateMonthTitle(pickerInstance), 10);
}
