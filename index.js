require("dotenv").config()

const express=require("express")
const cors= require("cors")
const connectDB=require("./db")
const customerRoutes= require("./routes/customerRoutes")
const productRoutes= require("./routes/productRoutes")
const orderRoutes= require("./routes/orderRoutes")

const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/customers", customerRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.get("/", (req,res)=>{res.send("Customer API is running!")})

const PORT=process.env.PORT || 3000
const startServer= async()=>{
    await connectDB()
    app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)
})
}
startServer()