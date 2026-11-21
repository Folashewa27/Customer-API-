const Order= require("../models/orderModel")
exports.createOrder= async(req,res)=>{
    try{
        const order= await Order.create(req.body)
        res.status(201).json({message:"Order created successfully", order})

    } catch(error){
        res.status(500).json({message: error.message})
    }
}
exports.getOrders=async (req,res)=>{
    try{
        const orders= await Order.find().populate("customer").populate("products.product")
        res.status(200).json(orders)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}
exports.getOrder= async(req,res)=>{
    try{
        const order= await Order.findById(req.params.id).populate("customer").populate("products.product")
        if(!order){
            return res.status(404).json({
                message:"Order not found"
            })
        }
        res.status(200).json(order)

    } catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.updateOrder =async(req,res)=>{
    try{
        const order=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json({
            message:"Order updated sucessfully", order
        })
    } catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.deleteOrder= async(req,res)=>{
    try{
        const order=await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return res.status(404).json({
                message:"Order not found"
            })
        }
        res.status(200).json({
            message:"Order deleted successfully"
        })
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}