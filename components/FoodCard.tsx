import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface FoodItem {
    id: string;
    title: string;
    businessName: string;
    originalPrice: number;
    discountedPrice: number;
    category: string;
    imageUrl: string;
    pickupTime: string;
    location: string;
    quantity: number;
    description: string;
}

interface FoodCardProps {
    item: FoodItem;
    onPurchase: (item: FoodItem) => void;
}

export function FoodCard({ item, onPurchase }: FoodCardProps) {
    const discount = Math.round((1 - item.discountedPrice / item.originalPrice) * 100);

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer min-w-0">
            <div className="relative">
                <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                    -{discount}%
                </Badge>
            </div>

            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium line-clamp-2">{item.title}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{item.businessName}</p>

                <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.pickupTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                    <span className="line-through text-muted-foreground">£{item.originalPrice.toFixed(2)}</span>
                    <span className="text-green-600">£{item.discountedPrice.toFixed(2)}</span>
                </div>

                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{item.quantity} portions left</span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={() => onPurchase(item)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={item.quantity === 0}
                >
                    {item.quantity === 0 ? 'Sold Out' : 'Reserve Now'}
                </Button>
            </CardFooter>
        </Card>
    );
}