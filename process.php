<?php
$field1 = $_GET['field01'];
$field2 = $_GET['field02'];
$field3 = $_GET['field03'];

if(!empty($field1))
	var_dump(explode(",",$field1));
if(!empty($field2))
	var_dump(explode(",",$field2));
if(!empty($field3))
	var_dump(explode(",",$field3));

echo '<a href="checkdown.html" alt="" >voltar</a>';
