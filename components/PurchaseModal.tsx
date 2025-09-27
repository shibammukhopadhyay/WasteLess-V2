import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Users, CreditCard } from "lucide-react";
import { FoodItem } from "./FoodCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PurchaseModalProps {
    item: FoodItem | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirmPurchase: (item: FoodItem) => void;
}

export function PurchaseModal({ item, isOpen, onClose, onConfirmPurchase }: PurchaseModalProps) {
    if (!item) return null;

    const discount = Math.round((1 - item.discountedPrice / item.originalPrice) * 100);

    const handleConfirm = () => {
        onConfirmPurchase(item);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-0 bg-white text-gray-900 border-gray-200">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle className="text-2xl font-bold text-center text-gray-900">Reserve Your Food</DialogTitle>
                </DialogHeader>
                
                <div className="px-6 pb-6">
                    {/* Food Image with Discount Badge */}
                    <div className="relative mb-4">
                        <ImageWithFallback
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-3 right-3 bg-green-600 text-white text-sm px-2 py-1">
                            -{discount}%
                        </Badge>
                                </div>

                    {/* Food Details */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-xl mb-1 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.businessName}</p>
                        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    </div>

                    {/* Pickup Information */}
                    <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600"><strong>Pickup:</strong> {item.pickupTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">{item.quantity} portions available</span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-medium text-gray-900">Total:</span>
                        <div className="flex items-center space-x-2">
                            <span className="line-through text-gray-500">${item.originalPrice.toFixed(2)}</span>
                            <span className="text-xl font-bold text-green-600">${item.discountedPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mb-4">
                        <Button 
                            variant="outline" 
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleConfirm}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay & Reserve
                        </Button>
                    </div>

                    {/* Confirmation Message */}
                    <p className="text-xs text-gray-600 text-center">
                        After payment, you'll receive pickup instructions and a confirmation code. 
                        Show this code when collecting your food.
                    </p>
                                </div>
            </DialogContent>
        </Dialog>
    );
}