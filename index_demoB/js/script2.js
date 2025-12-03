// document.querySelectorAll(".accordion-button").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const expanded = btn.getAttribute("aria-expanded") === "true";

//     // 收起所有
//     document.querySelectorAll(".accordion-button").forEach((b) => {
//       b.setAttribute("aria-expanded", "false");
//       b.nextElementSibling.style.maxHeight = null;
//     });

//     // 如果原本沒展開 → 展開它
//     if (!expanded) {
//       btn.setAttribute("aria-expanded", "true");
//       const content = btn.nextElementSibling;
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// });


$('#date-range').daterangepicker({
    autoApply: true,
    locale: { format: 'YYYY/MM/DD' }
});

$('#date-range-sm').daterangepicker({
    autoApply: true,
    locale: { format: 'YYYY/MM/DD' }
});

$(function () {
    const today = moment();
    const minDate = moment("2025-12-01");

    function initDateRange(inputId) {
        $(inputId).daterangepicker({
            autoApply: true,
            locale: {
                format: "YYYY/MM/DD",
                separator: " - ",
                daysOfWeek: ["一","二","三","四","五","六","日"],
                monthNames: [
                    "1 月","2 月","3 月","4 月","5 月","6 月",
                    "7 月","8 月","9 月","10 月","11 月","12 月"
                ],
                firstDay: 1
            },
            startDate: today,
            endDate: today,
            minDate: minDate,
            opens: "left"
        });

        const pickerInstance = $(inputId).data("daterangepicker");

        function updateMonthTitle(picker) {
            const leftMonth = picker.leftCalendar.month.month();
            const leftYear = picker.leftCalendar.month.year();
            const rightMonth = picker.rightCalendar.month.month();
            const rightYear = picker.rightCalendar.month.year();
            picker.container
                .find(".drp-calendar.left .month")
                .text(leftYear + " 年 " + (leftMonth + 1) + " 月");
            picker.container
                .find(".drp-calendar.right .month")
                .text(rightYear + " 年 " + (rightMonth + 1) + " 月");
        }

        $(inputId).on("show.daterangepicker showCalendar.daterangepicker", function(ev, picker){
            setTimeout(() => updateMonthTitle(picker), 10);
            picker.container.find("td.available").off("click").on("click", function(){
                picker.hide();
            });
        });

        setTimeout(() => updateMonthTitle(pickerInstance), 10);
    }

    // 桌面版初始化
    initDateRange("#date-range");

    // 手機版 accordion
    $(".accordion-button").on("click", function () {
        const $btn = $(this);
        const $content = $btn.next(".accordion-content");
        const $icon = $btn.find(".icon");
        const isExpanded = $btn.attr("aria-expanded") === "true";

        // 收起其他
        $(".accordion-button").not($btn).each(function(){
            $(this).attr("aria-expanded", "false");
            $(this).find(".icon").removeClass("expanded");
            $(this).next(".accordion-content").stop().animate({ maxHeight: 0 }, 300);
        });

        if (!isExpanded) {
            // 展開自己
            $btn.attr("aria-expanded", "true");
            $icon.addClass("expanded");

            const scrollHeight = $content.get(0).scrollHeight;
            $content.stop().css({ maxHeight: 0, display: "block" }).animate(
                { maxHeight: scrollHeight },
                300
            );
        } else {
            // 收起自己
            $btn.attr("aria-expanded", "false");
            $icon.removeClass("expanded");
            $content.stop().animate({ maxHeight: 0 }, 300);
        }

        // 初始化手機版日期選擇器
        const smInput = "#date-range-sm";
        if (!$(smInput).data("daterangepicker")) {
            $(smInput).show();
            initDateRange(smInput);
        }
    });
});
