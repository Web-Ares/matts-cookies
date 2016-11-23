<?php
$idProd = $_GET['id'];
$flag = $_GET['flag'];

if($flag == 'remove'){

    $json_data = '{
        "cartCountProducts": "1 item",
        "subtotal":"10$"
    }';

} else if($flag == 'changeCount'){

    $count = $_GET['countProduct'];

    $json_data = '{
        "total": "6$",
        "subtotal":"20$"
    }';

} else if($flag == 'addToCart'){

    $count = $_GET['countProduct'];
    $price = $_GET['price'];

    $json_data = '{
        "cartCountProducts": "2 item"
    }';

} else if($flag == 'coupon'){

    $value = $_GET['inputVal'];

    $json_data = '{
        "discount": "-$6.75",
        "subtotal": "$6.75",
        "status": 1
    }';

} else if($flag == 'couponRemove'){

    $value = $_GET['inputVal'];

    $json_data = '{
        "subtotal": "$10.75"
    }';

}

$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);


echo $json_data;
exit;
?>
