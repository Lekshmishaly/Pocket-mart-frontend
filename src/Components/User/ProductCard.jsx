import axiosInstance from "@/Utils/AxiosConfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { CalculateOfferPrice } from "@/Utils/CalculateOfferPrice";

function ProductCard({ product }) {
  // offers

  const [offerPrice, setofferPrice] = useState(0);
  const [offerDiscountAmount, setofferDiscountAmount] = useState(null);
  const [offerDiscountPercentage, setofferDiscountPercentage] = useState(null);
  const navigate = useNavigate();

  ///////////////////////////////////// offers ////////////////////////////////////////////

  async function offers() {
    const offerData = await CalculateOfferPrice(
      product._id,
      product.category,
      product.price
    );
    setofferPrice(offerData.offerPrice);
    setofferDiscountAmount(offerData.offerDiscountAmt);
    setofferDiscountPercentage(offerData.offerDiscount);
  }
  useEffect(() => {
    offers();
  }, []);
  return (
    <div
      onClick={() => {
        navigate(`/product-Page/${product._id}`);
      }}
      key={product.id}
      className="group">
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/3.6] mt-5 bg-[#E8E3DE] overflow-hidden">
        {/* Sold out badge */}
        {product.stocks === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="bg-white/70 px-3 py-0.5 text-[10px] sm:text-xs md:text-sm text-[#e06332] font-Futura-Light mb-4">
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* Offer discount badge - top-left corner */}
        {offerDiscountPercentage && product.stocks >= 1 && (
          <span
            className="
      absolute top-2 left-2
      sm:top-3 sm:left-3
      md:top-4 md:left-4
      lg:top-5 lg:left-5
      z-10
      bg-[#7f3113]
      text-white
      text-[9px] sm:text-[10px] md:text-[10.5px] lg:text-[11px]
      px-1.5 sm:px-2
      py-0.5 sm:py-1
      font-thin
      rounded-sm
      font-Futura-Light
      shadow
    ">
            {offerDiscountPercentage}% off
          </span>
        )}

        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 cursor-pointer"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4 mt-2 ">
        <div className="flex flex-col justify-between gap-1">
          {/* Name & Discount */}
          <div className="flex items-start justify-between">
            <h3 className="text-[#312f2d] text-[13px] font-thin leading-relaxed font-Futura-Light, sans-serif">
              {product.name}
            </h3>
          </div>

          {/* Prices */}
          <div className="text-left">
            {typeof offerPrice === "number" &&
            offerPrice > 0 &&
            offerPrice < product.price &&
            product.stocks >= 1 ? (
              <p className="text-[#e3703b] text-[12px] font-thin leading-relaxed font-Futura-Light, sans-serif flex flex-wrap items-baseline gap-1">
                ₹{Math.round(offerPrice).toFixed(2)}
                <span className="text-gray-700 line-through text-[9px] font-Futura-Light whitespace-nowrap">
                  INR {product.price.toFixed(2)}
                </span>
              </p>
            ) : (
              <p className="text-[#93624c] text-[12px] font-thin leading-relaxed font-Futura-Light, sans-serif">
                INR {product.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
