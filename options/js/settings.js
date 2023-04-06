$(document).ready(function () {

    // テーブルの行を削除する処理
    function deleteRow() {
        $(this).parents('tr').remove();
    }

    // テーブルに行を追加する処理
    function addRow() {
        // テーブルの最終行をクローンしてテーブルの最後に追加する
        // 追加したらその行の中身をクリアする
        $("#manual_patterns tbody tr:last-child").clone(true).appendTo("#manual_patterns tbody");
        $("#manual_patterns tbody tr:last-child input").val("");

        // 追加した行の行削除ボタンを表示/enabledにする
        $(".delete_row").last().show();
        $(".delete_row").last().prop("disabled", false);

        // 行削除ボタンにクリックイベントをバインドする
        $(".delete_row").off('click').on('click', deleteRow);
    }

    // ストレージへの保存
    function saveColorSettings() {
        var array = [];
        $('input[name="color_settings"]').each(function (i, elem) {
            var object = {
                id: $(".usersetting .usersetting_id").eq(i).val(),
                color: $(".usersetting .usersetting_color").eq(i).val()
            };
            if (object['id'] != '' && object['color'] != '') {
                array.push(object);
            }
        });

        var color_settings = array;
        localStorage.setItem("color_settings", JSON.stringify(color_settings));
    }
    // 全削除
    function deleteAllRows() {
        // ストレージに保存した色設定をクリア
        confirmed = window.confirm('Are you surely want to delete all records?');
        if (confirmed) {
            localStorage.setItem("color_settings", JSON.stringify([]));

            // 入力欄をクリアする
            $("#manual_patterns tbody > tr").each(function () {
                $(this).find('input.usersetting_id').val("");
                $(this).find('input.usersetting_color').val("");
            })
            // 1行だけ残して入力欄を削除する
            $("#manual_patterns tbody > tr").not(':first').remove();
        }
    }

    // 自動/手動の切り替え
    function toggleMethod() {
        if ($(this).prop('checked')) {
            $(".manual_color_setting").show();
            var set_color_manually = true;
        } else {
            $(".manual_color_setting").hide();
            var set_color_manually = false;
        }

        localStorage.setItem("set_color_manually", JSON.stringify(set_color_manually));
    }

    // ローカルストレージのデータからテーブルを生成
    // 色設定を取得して入力欄にセットする
    var color_settings = localStorage.getItem('color_settings');
    if (color_settings) {
        color_settings = JSON.parse(color_settings);
        // 色設定が1行しかないとき、削除ボタンは隠す/disabledにする
        if (color_settings.length === 1) {
            $(".delete_row:only-of-type").hide();
            $(".delete_row:only-of-type").prop("disabled", true);
        }

        // 色設定が2行以上ある場合には、設定値の数だけ行を追加する
        if (color_settings.length > 1) {
            for (let i = 0; i < color_settings.length - 1; ++i) {
                addRow();
            };
        }

        // 色設定がある場合には、設定値を入力欄にセットする
        if (color_settings.length > 0) {
            $("#manual_patterns tbody > tr").each(function (index) {
                $(this).find('input.usersetting_id').val(color_settings[index].id);
                $(this).find('input.usersetting_color').val(color_settings[index].color);
            })
        }

    }

    // 自動/手動の値取得、手動の場合は設定欄を表示
    const set_color_manually = JSON.parse(localStorage.getItem('set_color_manually'));
    if (set_color_manually) {
        $('input[id="color_mode_manual"]').prop("checked", true);
        $(".manual_color_setting").show();
    } else {
        $('input[id="color_mode_manual"]').prop("checked", false);
    }

    // イベントを各ボタンにバインド
    $(".delete_row").on('click', deleteRow);
    $("#add_row").on('click', addRow);
    $("#save").on('click', saveColorSettings);
    $("#delete_all").on('click', deleteAllRows);
    $('input[id="color_mode_manual"]').on('change', toggleMethod);
});