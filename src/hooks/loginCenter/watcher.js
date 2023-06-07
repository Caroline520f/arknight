import { watch } from 'vue';

export function watcher(arr) {
    arr.forEach(item => {
        watch(item, (newValue) => {
            // judge the input value is null or not
            if (item.value == null) {
                item.isShow = true;
            } else if (item.zz) {
                // judge the regExp
                if (item.zz.test(newValue.value)) {
                    item.isShow = false;
                } else if (!item.zz.test(newValue.value)) {
                    item.isShow = true;
                }
            } else {
           
                // if (item.use == '确认密码') {
                    if ( newValue.value == arr[1].value ) {
                        item.isShow = false;
                    } else {
                        item.isShow = true;
                     
                    }
                // }
            }
        });
    });
}