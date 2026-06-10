import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import VerdoraAssistant from "@/components/VerdoraAssistant";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Vegetables from "@/pages/Vegetables";
import Fruits from "@/pages/Fruits";
import BulkOrders from "@/pages/BulkOrders";
import Farmers from "@/pages/Farmers";
import Offers from "@/pages/Offers";
import Cart from "@/pages/Cart";
import SellerDashboard from "@/pages/SellerDashboard";

import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/context/CartContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/vegetables" component={Vegetables} />
      <Route path="/fruits" component={Fruits} />
      <Route path="/bulk-orders" component={BulkOrders} />
      <Route path="/farmers" component={Farmers} />
      <Route path="/offers" component={Offers} />
      <Route path="/cart" component={Cart} />
      <Route path="/seller/dashboard" component={SellerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
            <VerdoraAssistant />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
