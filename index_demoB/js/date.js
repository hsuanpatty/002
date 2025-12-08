// 讓手機點日期不跳出鍵盤（一定要放最前面）
$("#date-range, #date-range-sm").attr("readonly", true);

$(function () {
      const today = moment(); // 當天

     function initDateRange(inputId) {
   $("#date-range,#date-range-sm").daterangepicker({
            autoApply: true,
            minDate: today, // 禁止選擇過去日期
            showDropdowns: false, // 不顯示月份/年份下拉選單
            locale: {
              format: "YYYY/MM/DD",
              separator: " - ",
              applyLabel: "確定",
              cancelLabel: "取消",
              daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
              monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            },
            opens: "center",
          });
        const pickerInstance = $(inputId).data("daterangepicker");

 

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


$(function () {
    $('.only-apply').prop('checked', true);
});

