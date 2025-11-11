import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  emoji: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, title: 'Ответ по математике', category: 'Математика', price: 299, description: 'Решение задач с подробным объяснением', emoji: '📐' },
  { id: 2, title: 'Эссе по литературе', category: 'Литература', price: 499, description: 'Анализ произведений и сочинения', emoji: '📚' },
  { id: 3, title: 'Физика: задачи', category: 'Физика', price: 399, description: 'Решения с формулами и пояснениями', emoji: '⚡' },
  { id: 4, title: 'Химия: реакции', category: 'Химия', price: 349, description: 'Уравнения и механизмы реакций', emoji: '🧪' },
  { id: 5, title: 'История: даты', category: 'История', price: 249, description: 'Хронология событий с контекстом', emoji: '📜' },
  { id: 6, title: 'Биология: термины', category: 'Биология', price: 299, description: 'Определения и схемы процессов', emoji: '🧬' },
  { id: 7, title: 'Английский: грамматика', category: 'Английский', price: 199, description: 'Правила и примеры использования', emoji: '🇬🇧' },
  { id: 8, title: 'География: карты', category: 'География', price: 279, description: 'Описание регионов и климата', emoji: '🌍' },
];

const categories = ['Все', 'Математика', 'Литература', 'Физика', 'Химия', 'История', 'Биология', 'Английский', 'География'];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('catalog');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} добавлен в корзину!`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.info('Товар удален из корзины');
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleSubscription = (category: string) => {
    setSubscriptions(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4 pb-24">
        <header className="mb-8 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Магазин Ответов
              </h1>
              <p className="text-muted-foreground">Найди решение любой задачи</p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="User" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Профиль</SheetTitle>
                  <SheetDescription>Управляйте своим аккаунтом</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 gradient-primary">
                      <AvatarFallback className="text-white text-xl">АЛ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Александр</p>
                      <p className="text-sm text-muted-foreground">@alex_student</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg gradient-card border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Баланс</span>
                        <Icon name="Wallet" size={16} className="text-primary" />
                      </div>
                      <p className="text-2xl font-bold">1,500 ₽</p>
                    </div>

                    <div className="p-4 rounded-lg gradient-card border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Куплено ответов</span>
                        <Icon name="ShoppingBag" size={16} className="text-secondary" />
                      </div>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="History" size={18} className="mr-2" />
                      История покупок
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="CreditCard" size={18} className="mr-2" />
                      Способы оплаты
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Settings" size={18} className="mr-2" />
                      Настройки
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 p-1 h-auto">
            <TabsTrigger value="catalog" className="gap-2">
              <Icon name="ShoppingBag" size={18} />
              <span className="hidden sm:inline">Каталог</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="gap-2 relative">
              <Icon name="ShoppingCart" size={18} />
              <span className="hidden sm:inline">Корзина</span>
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center gradient-primary border-0 text-white">
                  {cartItemsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2">
              <Icon name="Bell" size={18} />
              <span className="hidden sm:inline">Подписки</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="gap-2">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">Поддержка</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6 animate-fade-in">
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "gradient-primary text-white border-0" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="hover-lift border-2 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader className="gradient-card pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-4xl mb-2">{product.emoji}</div>
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                        <CardDescription className="mt-1">{product.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Badge variant="secondary" className="mb-3">
                      {product.category}
                    </Badge>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                        {product.price} ₽
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full gradient-primary text-white border-0"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cart" className="animate-fade-in">
            {cart.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-2xl font-bold mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
                <Button onClick={() => setActiveTab('catalog')} className="gradient-primary text-white border-0">
                  <Icon name="ShoppingBag" size={18} className="mr-2" />
                  Перейти в каталог
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <Card key={item.id} className="overflow-hidden animate-scale-in">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{item.emoji}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 border rounded-lg p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          <div className="text-right min-w-[80px]">
                            <p className="font-bold text-lg">{item.price * item.quantity} ₽</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="gradient-card border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                        {totalPrice} ₽
                      </span>
                    </div>
                    <Button className="w-full gradient-primary text-white border-0 h-12 text-lg">
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Оформить заказ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscriptions" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Подписки на категории</CardTitle>
                <CardDescription>
                  Получайте уведомления о новых ответах в выбранных категориях
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {categories.filter(c => c !== 'Все').map(category => {
                      const isSubscribed = subscriptions.includes(category);
                      return (
                        <div
                          key={category}
                          className="flex items-center justify-between p-4 rounded-lg border hover-lift"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">
                              {products.find(p => p.category === category)?.emoji || '📚'}
                            </div>
                            <div>
                              <Label htmlFor={category} className="text-base font-semibold cursor-pointer">
                                {category}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {products.filter(p => p.category === category).length} товаров
                              </p>
                            </div>
                          </div>
                          <Switch
                            id={category}
                            checked={isSubscribed}
                            onCheckedChange={() => {
                              toggleSubscription(category);
                              toast.success(
                                isSubscribed
                                  ? `Подписка на ${category} отменена`
                                  : `Вы подписались на ${category}`
                              );
                            }}
                            className="data-[state=checked]:gradient-primary"
                          />
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="animate-fade-in">
            <div className="grid gap-4">
              <Card className="gradient-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Headphones" size={24} />
                    Служба поддержки
                  </CardTitle>
                  <CardDescription>
                    Мы всегда рады помочь вам с любыми вопросами
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start gradient-primary text-white border-0 h-12">
                    <Icon name="MessageCircle" size={20} className="mr-3" />
                    Написать в чат
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Icon name="Mail" size={20} className="mr-3" />
                    support@answers-shop.com
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Icon name="Phone" size={20} className="mr-3" />
                    +7 (999) 123-45-67
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { q: 'Как оплатить заказ?', a: 'Принимаем карты, СБП и электронные кошельки' },
                    { q: 'Как быстро получу ответ?', a: 'Обычно в течение 5-15 минут после оплаты' },
                    { q: 'Что если ответ не подошел?', a: 'Гарантия возврата денег в течение 24 часов' },
                  ].map((faq, i) => (
                    <div key={i} className="p-4 rounded-lg border hover-lift">
                      <h4 className="font-semibold mb-2">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
