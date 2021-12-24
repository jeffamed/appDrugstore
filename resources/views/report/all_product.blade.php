<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Informe</title>
    <style>
        *{
            margin: 5px;
            padding: 0;
        }
        @page {
            margin: 0cm 0cm;
        }
        header {
            position: fixed;
            top: 0cm;
            left: 0cm;
            right: 0cm;
            height: 20vh;
        }
        footer {
            position: fixed;
            bottom: -22cm;
            left: 0cm;
            right: 0cm;
            height: 20vh;
        }
        body{
            margin: 0;
            margin-left: 10px;
            font-size: 15px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        h5{
            font-weight: normal;
            font-family: Arial;
            text-transform: uppercase;
        }
        .bold{
            font-weight: bold
        }
        .tabla{
            width: 90%;
            border-spacing: 0;
            padding: 0;
            margin: 0;
        }
        th,td{
            text-align: left;
            border-spacing: 0;
            border-collapse: collapse;
        }
        tbody{
            border-bottom: 0px solid;
        }
        th{
            border-top: 0px solid;
            border-bottom: 0px solid;
            text-align: center;
        }
        tfoot tr td{
            padding-top: 10px;
        }
    </style>
</head>
<body>
<div>
    <div style="text-align: center">
        <h2 class="bold text-center">FARMACIA</h2>
        <h4>LISTADO DE PRODUCTO EXISTENTE Y PRECIO</h4>
    </div>
</div>
<table class="tabla">
    <thead>
    <tr>
        <th style="text-align: left">Codigo</th>
        <th style="text-align: left">Producto</th>
        <th style="text-align: center">Existencia</th>
        <th style="text-align: center">P.Compra</th>
        <th style="text-align: center">P.Venta</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($products as $p)
        <tr style="padding-bottom: 10px; padding-top: 10px">
            <td>{{ $p->code }}</td>
            <td>{{ $p->name }}</td>
            <td style="text-align: center">{{ $p->stock }}</td>
            <td style="text-align: right">{{ number_format($p->cost , 2) }}</td>
            <td style="text-align: right">{{ number_format($p->price, 2) }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>