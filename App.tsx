import { useState } from "react";
import { Header } from "./components/Header";
import { CategoryFilter } from "./components/CategoryFilter";
import { FoodCard, FoodItem } from "./components/FoodCard";
import { BusinessDashboard } from "./components/BusinessDashboard";
import { PurchaseModal } from "./components/PurchaseModal";
import { Toaster, toast } from "sonner";
import { MapPin, Search } from "lucide-react";
import { Input } from "./components/ui/input";

// Mock data for demonstration
const initialFoodItems: FoodItem[] = [
  {
    id: '1',
    title: 'Artisan Bread & Pastries Surprise Bag',
    businessName: 'University Bakery',
    originalPrice: 12.00,
    discountedPrice: 4.99,
    category: 'bakery',
    imageUrl: 'https://images.unsplash.com/photo-1698288280603-22997a335234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJha2VyeSUyMGJyZWFkJTIwcGFzdHJpZXN8ZW58MXx8fHwxNzU4OTg5MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pickupTime: '7:00 PM - 8:30 PM',
    location: 'Campus Center',
    quantity: 5,
    description: 'A selection of fresh artisan breads, croissants, and pastries from today\'s batch.'
  },
  {
    id: '2',
    title: 'Wood-Fired Pizza Slices',
    businessName: 'Campus Pizza Co.',
    originalPrice: 15.00,
    discountedPrice: 6.50,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1727198826083-6693684e4fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDF8fHx8MTc1ODk4Mzk2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    pickupTime: '8:30 PM - 9:30 PM',
    location: 'Student Quarter',
    quantity: 3,
    description: 'Assorted wood-fired pizza slices from today\'s service. May include margherita, pepperoni, and veggie options.'
  },
  {
    id: '3',
    title: 'Gourmet Sandwiches & Coffee',
    businessName: 'Study Café',
    originalPrice: 9.50,
    discountedPrice: 3.99,
    category: 'cafe',
    imageUrl: 'https://images.unsplash.com/photo-1564435408878-c4a4f2a3d0ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwc2FuZHdpY2glMjBjb2ZmZWV8ZW58MXx8fHwxNzU4OTg5MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    pickupTime: '6:00 PM - 7:00 PM',
    location: 'Library District',
    quantity: 8,
    description: 'Fresh sandwiches with premium ingredients plus a hot coffee or tea of your choice.'
  },
  {
    id: '4',
    title: 'Combination Fried Rice',
    businessName: 'Chuong Garden',
    originalPrice: 14.00,
    discountedPrice: 4.50,
    category: 'asian',
    imageUrl: 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/ohxnbldw/3a958f83-376b-482f-b47d-51132388846d.jpg',
    pickupTime: '8:00 PM - 9:00 PM',
    location: '915 Broad St.',
    quantity: 6,
    description: 'A hearty, savory fried rice dish combining tender pieces of chicken, beef, shrimp sautéed with a colorful medley of diced vegetables (like peas, carrots, onions) and fluffy wok-fried rice.'
  }
];

export default function App() {
  const [userType, setUserType] = useState<'student' | 'business' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const businessItems = foodItems.filter(item => item.businessName === "Your Business");

  const handlePurchase = (item: FoodItem) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = (item: FoodItem) => {
    // Update quantity
    setFoodItems(items => 
      items.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
    
    setShowPurchaseModal(false);
    toast.success(`Successfully reserved ${item.title}! Check your email for pickup details.`, {
      duration: 5000
    });
  };

  const handleAddItem = (newItem: Omit<FoodItem, 'id'>) => {
    const item: FoodItem = {
      ...newItem,
      id: Date.now().toString()
    };
    setFoodItems(items => [...items, item]);
    toast.success('Item added successfully!');
  };

  const handleUpdateItem = (id: string, updates: Partial<FoodItem>) => {
    setFoodItems(items => 
      items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setFoodItems(items => items.filter(item => item.id !== id));
    toast.success('Item removed successfully!');
  };

  if (userType === 'business') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userType={userType} onUserTypeChange={setUserType} />
        <BusinessDashboard
          onAddItem={handleAddItem}
          businessItems={businessItems}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
        />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType={userType} onUserTypeChange={setUserType} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {userType === null && (
          <div className="text-center mb-8 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="mb-4 text-green-600">Welcome to SaveBites</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Help reduce food waste while saving money! Businesses post surplus food at closing time, 
              and students can grab amazing deals. Join the movement to save food and save money.
            </p>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Grinnell, IA • Available 6-10 PM daily</span>
            </div>
          </div>
        )}
        
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for food items or restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🍽️</div>
            <h3>No items found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search or filter.' : 'Check back later for new deals!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </main>

      <PurchaseModal
        item={selectedItem}
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onConfirmPurchase={handleConfirmPurchase}
      />
      
      <Toaster />
    </div>
  );
}