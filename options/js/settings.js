// 初期表示
$(window).on('load', function () {
    // ローカルストレージのデータからテーブル生成
    // 自動/手動の値取得、手動の場合は設定欄を表示
    var set_color_manually = localStorage.getItem('set_color_manually');
    console.log(set_color_manually);
    if (set_color_manually === 'true') {
        $('input[id="color_mode_manual"]').prop("checked", true);
        $(".manual-color-setting").show();
    } else {
        $('input[id="color_mode_manual"]').prop("checked", false);
    }

    // ID/色のペアを取得して入力欄にセット
    // color_settings = localStorage.getItem("color_settings").parse();

    // 色設定が1行しかないとき、削除ボタンは隠す/disabledにする
    $(".delete_row:only-of-type").hide();
    $(".delete_row:only-of-type").prop("disabled", true);
});

$(function () {
    // 行削除ボタンの処理
    $(".delete_row").click(function () {
        $(this).parents('tr').remove();
    });

    // 行追加ボタンの処理
    $("#add_row").click(function () {
        // テーブルの最終行をクローンしてテーブルの最後に追加する
        // 追加したらその行の中身をクリアする
        $("#manual_patterns tbody tr:last-child").clone(true).appendTo("#manual_patterns tbody");
        $("#manual_patterns tbody tr:last-child input").val("");
        // 追加した行の行削除ボタンを表示/enabledにする
        $(".delete_row").last().show();
        $(".delete_row").last().prop("disabled", false);
    });

    // 保存ボタンの処理
    // ローカルストレージに保存
    $("#save").click(function () {
        var array = [];
        $('input[name="color_settings"]').each(function (i, elem) {
            var object = {
                "id": $(".usersetting .usersetting_id").eq(i).val(),
                "color": $(".usersetting .usersetting_color").eq(i).val()
            };
            if (object['id'] != '' && object['color'] != '') {
                array.push(object);
            }
        });

        var color_settings = JSON.stringify(array);
        localStorage.setItem("color_settings", color_settings);
    });

    // 全削除ボタンの処理    
    // ローカルストレージをクリアする
    $("#delete_all").click(function () {
        confirmed = window.confirm('Are you surely want to delete all records?');
        if (confirmed) {
            localStorage.setItem("color_settings", JSON.stringify([]));
            // 入力欄もクリアする
            $("#manual_patterns tbody > tr").each(function () {
                $(this).find('input.usersetting_id').val("");
                $(this).find('input.usersetting_color').val("");
            })
            // 1行だけ残して行削除する
            $("#manual_patterns tbody > tr").not(':first').remove();
        }
    });

    // 手動/自動チェックボックスの処理
    // 変更されたら表示非表示を切り替える&ローカルストレージに値を保存
    $('input[id="color_mode_manual"]').change(function () {
        if ($(this).prop('checked')) {
            $(".manual-color-setting").show();
            var set_color_manuallly = true;
        } else {
            $(".manual-color-setting").hide();
            var set_color_manuallly = false;
        }

        localStorage.setItem("set_color_manually", set_color_manuallly);
    });
});