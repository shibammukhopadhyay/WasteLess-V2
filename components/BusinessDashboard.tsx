import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { FoodItem } from "./FoodCard";

interface BusinessDashboardProps {
    onAddItem: (item: Omit<FoodItem, 'id'>) => void;
    businessItems: FoodItem[];
    onUpdateItem: (id: string, updates: Partial<FoodItem>) => void;
    onDeleteItem: (id: string) => void;
}

export function BusinessDashboard({ onAddItem, businessItems, onUpdateItem, onDeleteItem }: BusinessDashboardProps) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        originalPrice: '',
        discountedPrice: '',
        category: '',
        pickupTime: '',
        location: '',
        quantity: '',
        description: '',
        imageUrl: ''
    });

    const categories = [
        { value: 'bakery', label: 'Bakery' },
        { value: 'pizza', label: 'Pizza' },
        { value: 'asian', label: 'Asian' },
        { value: 'cafe', label: 'Café' },
        { value: 'dessert', label: 'Dessert' },
        { value: 'healthy', label: 'Healthy' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddItem({
            title: formData.title,
            businessName: "Your Business", // In real app, this would come from user profile
            originalPrice: parseFloat(formData.originalPrice),
            discountedPrice: parseFloat(formData.discountedPrice),
            category: formData.category,
            pickupTime: formData.pickupTime,
            location: formData.location,
            quantity: parseInt(formData.quantity),
            description: formData.description,
            imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
        });
        setFormData({
            title: '',
            originalPrice: '',
            discountedPrice: '',
            category: '',
            pickupTime: '',
            location: '',
            quantity: '',
            description: '',
            imageUrl: ''
        });
        setShowAddForm(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2>Business Dashboard</h2>
                <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add New Item</span>
                </Button>
            </div>

            {showAddForm && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Add New Food Item</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title">Item Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        placeholder="e.g. Mixed pastries surprise bag"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                                    <Input
                                        id="originalPrice"
                                        type="number"
                                        step="0.01"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
                                    <Input
                                        id="discountedPrice"
                                        type="number"
                                        step="0.01"
                                        value={formData.discountedPrice}
                                        onChange={(e) => setFormData({...formData, discountedPrice: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="pickupTime">Pickup Time</Label>
                                    <Input
                                        id="pickupTime"
                                        value={formData.pickupTime}
                                        onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                                        placeholder="e.g. 8:00 PM - 9:00 PM"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="quantity">Quantity Available</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="location">Pickup Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    placeholder="e.g. City Center"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe what's included in this bag..."
                                />
                            </div>
                            <div className="flex space-x-4">
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">Add Item</Button>
                                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                <h3>Your Active Listings</h3>
                {businessItems.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No items posted yet. Add your first item to get started!
                        </CardContent>
                    </Card>
                ) : (
                    businessItems.map((item) => (
                        <Card key={item.id}>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4>{item.title}</h4>
                                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span>${item.originalPrice.toFixed(2)} → ${item.discountedPrice.toFixed(2)}</span>
                                            <span>{item.quantity} portions</span>
                                            <span>{item.pickupTime}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button size="sm" variant="outline">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onDeleteItem(item.id)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}