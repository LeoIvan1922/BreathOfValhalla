import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productService, categoryService } from '@/lib/supabase';
import type { Product, Category } from '@/lib/supabase';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) return;

      try {
        setLoading(true);
        setError(null);

        const [productsData, categoryData] = await Promise.all([
          productService.getByCategory(categoryId),
          categoryService.getById(categoryId)
        ]);

        setProducts(productsData || []);
        setCategory(categoryData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Помилка завантаження даних');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_640.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10">
        <Header />

        <main className="py-16">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-8 hover:bg-accent/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад до каталогу
            </Button>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-accent rounded-full" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              <>
                {category && (
                  <div className="mb-12">
                    <div className="text-center">
                      <Badge className="mb-4 gradient-gold text-lg px-6 py-3">
                        {category.name}
                      </Badge>
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Товари категорії <span className="gradient-primary bg-clip-text text-transparent">{category.name}</span>
                      </h1>
                      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {category.description || 'Великий вибір товарів цієї категорії'}
                      </p>
                    </div>
                  </div>
                )}

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">На жаль, у цій категорії немає товарів</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="card-glass rounded-lg overflow-hidden group hover-lift hover-glow-fuchsia"
                      >
                        <div className="relative overflow-hidden aspect-square">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {!product.in_stock && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">Немає в наявності</span>
                            </div>
                          )}
                          <Badge className="absolute top-3 right-3 gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            {product.rating || 5.0}
                          </Badge>
                        </div>

                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-bold text-lg mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div>
                              <span className="text-2xl font-bold text-accent">{product.price.toLocaleString()}₴</span>
                              {product.reviews_count && (
                                <p className="text-xs text-muted-foreground">{product.reviews_count} відгуків</p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              disabled={!product.in_stock}
                              className={product.in_stock ? 'gradient-gold' : ''}
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;
