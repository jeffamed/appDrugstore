<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\OrderDetails;
use App\Models\Product;
use App\Models\Usage;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\PDF;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $products = Product::where($request->condition,'like','%'.$request->search.'%')->latest('id')->paginate(6);

        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
       $product = Product::create($request->except('usage_id'));

        $product->usages()->sync($request->usage_id);

        return response()->json("Registrado Correctamente");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product->laboratorio = optional($product->laboratory)->name;
        $product->presentacion = optional($product->presentation)->name;
        $product->ubicacion = optional($product->location)->name;
        $product->tipo = optional($product->type)->name;
        $product->proveedor = optional($product->supplier)->name;
        $product->usage_id = $product->usages->map(function ($item, $key){
            return $item->id;
        });

        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->except('usage_id','laboratorio','ubicacion','tipo','presentacion','proveedor','usages','laboratory','supplier'));

        if (count($request->usage_id) > 0){
            $product->usages()->sync($request->usage_id);
        }

        return response()->json("Actualizado Correctamente");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json("Eliminado Correctamente");
    }

    public function search(Request $request)
    {
          if($request->condition === 'code'){
              $products = Product::where('code','like','%'.$request->search.'%')->first();
              if ($products){
                  $products->presentacion = $products->presentation->name;
              }
          }
          elseif ($request->condition === 'usage')
          {
             $usages = Usage::with('products.presentation')->find($request->search);
             $products = $usages->products;
             foreach ($products as $product){
                $product->qtyOrder = 0;
                $product->discountOrder = 0;
             }
             return response()->json($products);
          }
          elseif ($request->condition === 'order')
          {
              $order = OrderDetails::with('product.presentation')->where('order_id', '=', $request->search)->get();
              $products = collect();
              foreach ($order as $item){
                  $item->product->reimbursement = 0;
                  $item->product->order = $item->orderQty;
                  $item->product->expire = $item->expire_at;
                  $item->product->unitPrice = $item->unitPrice;
                  $products->push($item->product);
              }
              return response()->json($products);
          }
          elseif ($request->condition === 'reimbursement')
          {
              $order = OrderDetails::with('product.presentation')->where('order_id', '=', $request->search)->get();
              $products = collect();
              foreach ($order as $item){
                  $item->product->reimbursement = 0;
                  $item->product->order = $item->orderQty;
                  $item->product->unitPrice = $item->unitPrice;
                  $item->product->discountOrder = $item->discount;
                  $products->push($item->product);
              }
              return response()->json($products);
          }
          else{
              $products = Product::with('presentation')
                        ->select()
                        ->addSelect(DB::raw('0 as costOrder, 0 as qtyOrder, 0 as discountOrder, "" as expireOrder, 0 as pvp '))
                        ->where('name','like','%'.$request->search.'%')
                        ->take(25)->get();
          }

          return response()->json($products);
    }

    public function reportAll()
    {
        $products = Product::all();

        $pdf = \PDF::loadView('report.all_product', compact('products'));

        return $pdf->download('inventario.pdf');
    }

    public function addBonus(Request $request,  Product $product)
    {
        $product->stock = $product->stock + $request->cantidad;
        $product->save();

        return response()->json('Aumento stock', 200);
    }
}
