import express from "express";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/todo.js"
import couponRoutes from "./routes/coupons.js"
import catRoutes from "./routes/categories.js"
import blogRoutes from "./routes/blogs.js"
import productRoutes from "./routes/products.js"
import userProductsRoutes from "./routes/userProducts.js"
import cartRoutes from "./routes/cart.js"
import relatedProductsRoutes from "./routes/relatedProducts.js"
import featuredProductsRoutes from "./routes/featuredProducts.js"
import wishlistRoutes from "./routes/wishlist.js"
import checkWishlistRoutes from "./routes/checkWishlist.js"
import reviewRoutes from "./routes/review.js"
import addressRoutes from "./routes/address.js"
import orderRoutes from "./routes/order.js"
import userProfileRoutes from "./routes/userProfile.js"
import dotenv from "dotenv"
import path from "path"
import cors from 'cors'

dotenv.config();

//lets create our app
const app = express()

app.use(cors())

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/task", taskRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/categories", catRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/products", productRoutes)
app.use("/api/userProducts", userProductsRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/relatedProducts", relatedProductsRoutes)
app.use("/api/featured", featuredProductsRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/checkWishlist", checkWishlistRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/address", addressRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/userProfile", userProfileRoutes)

if(process.env.NODE_ENV=='production'){

  app.get('/',(req,res)=>{
      app.use(express.static(path.resolve(__dirname,'client','build')))
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(process.env.PORT || 7070,()=>{
    console.log("connected")
})