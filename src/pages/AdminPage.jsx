import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Shield, TrendingUp, Flame, ListChecks, Users, UserCog, UserPlus, Eye, EyeOff, BarChart3, Network, AlertTriangle, Tag, Video, Image as ImageIcon, Layers, DollarSign } from "lucide-react";
import { getStrategies as getInitialStrategies } from "@/lib/data";
import StrategyForm from "@/components/admin/StrategyForm";
import StrategyListItem from "@/components/admin/StrategyListItem";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { addStrategyToDB } from "../api/strategies";

const MATTERMOST_BASE_URL = import.meta.env.VITE_MATTERMOST_BASE_URL;
const MATTERMOST_ADMIN_TOKEN = import.meta.env.VITE_MATTERMOST_ADMIN_TOKEN;
const TEAM_ID = import.meta.env.VITE_MATTERMOST_TEAM_ID;
const CHANNEL_ID = import.meta.env.VITE_MATTERMOST_CHANNEL_ID;

const initialStrategyFormData = {
  title: "",
  description: "",
  risk: "low", // Overall risk
  expectedReturn: "",
  timeFrame: "",
  author: "Admin",
  blockchain: "Ethereum",
  strategyType: "Yield Farming", // New
  requiredProtocols: "", // New - comma separated
  complexity: "Beginner", // New
  tags: "", // New - comma separated
  videoTutorialUrl: "", // New
  infographicUrl: "", // New
  estimatedGasFees: "Medium", // New
  smartContractRisk: "Audited", // New
  impermanentLossRisk: "N/A", // New
  steps: [{ title: "", description: "", tip: "" }],
  is_sample: false,
};

const AdminPage = () => {
  const [strategies, setStrategies] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState(null);
  const [formData, setFormData] = useState(initialStrategyFormData);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [showNewAdminPassword, setShowNewAdminPassword] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchAdminUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("id, email, username, role");

    if (error) {
      toast({
        variant: "destructive",
        title: "Error Fetching Admins",
        description: error.message,
      });
      return;
    }

    const adminsAndWorkers = data.filter(user => user.role === 'admin' || user.role === 'worker');
    setAdminUsers(adminsAndWorkers);
  };

  const fetchStrategies = async () => {
    try {
      const { data, error } = await supabase
        .from("strategies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching strategies:", error.message);
        toast({
          variant: "destructive",
          title: "Error Fetching Strategies",
          description: error.message,
        });
        return;
      }

      setStrategies(data || []);
    } catch (err) {
      console.error("Unexpected error fetching strategies:", err);
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "Failed to fetch strategies",
      });
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const role = user?.user_metadata?.role;

      if (!user || (role !== 'admin' && role !== 'worker')) {
        toast({ variant: "destructive", title: "Access Denied", description: "Please log in as an admin or worker." });
        navigate("/admin-login");
      } else {
        setCheckingAuth(false);
      }
    };

    checkAdmin();
  }, [navigate, toast]);

  useEffect(() => {
    if (!checkingAuth) {
      fetchStrategies();
    }
  }, [checkingAuth]);

  useEffect(() => {
    if (!checkingAuth) {
      fetchAdminUsers();
    }
  }, [checkingAuth]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleRiskChange = (value) => setFormData(prev => ({ ...prev, risk: value }));
  const handleBlockchainChange = (value) => setFormData(prev => ({ ...prev, blockchain: value }));
  const handleStrategyTypeChange = (value) => setFormData(prev => ({ ...prev, strategyType: value }));
  const handleComplexityChange = (value) => setFormData(prev => ({ ...prev, complexity: value }));
  const handleSmartContractRiskChange = (value) => setFormData(prev => ({ ...prev, smartContractRisk: value }));
  const handleImpermanentLossRiskChange = (value) => setFormData(prev => ({ ...prev, impermanentLossRisk: value }));

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const newSteps = [...formData.steps];
    newSteps[index][name] = value;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const addStep = () => {
    setFormData(prev => ({ ...prev, steps: [...prev.steps, { title: "", description: "", tip: "" }] }));
  };

  const removeStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const handleSubmitStrategy = async (e) => {
    e.preventDefault();

    if (formData.steps.length === 0) {
      toast({ variant: "destructive", title: "Error", description: "A strategy must have at least one step." });
      return;
    }

    try {
      const normalizedForm = {
        ...formData,
        tags: Array.isArray(formData.tags)
          ? formData.tags
          : (formData.tags || "").split(",").map(tag => tag.trim()),
        requiredProtocols: Array.isArray(formData.requiredProtocols)
          ? formData.requiredProtocols
          : (formData.requiredProtocols || "").split(",").map(p => p.trim()),
      };

      if (editingStrategy) {
        // 🔁 UPDATE strategy
        const { data, error } = await supabase
          .from("strategies")
          .update(normalizedForm)
          .eq("id", editingStrategy.id);

        if (error) {
          toast({ variant: "destructive", title: "Update Error", description: error.message });
          return;
        }

        toast({ title: "✅ Strategy Updated", description: "Changes saved successfully." });
      } else {
        // ➕ INSERT new strategy
        const { data, error } = await supabase
          .from("strategies")
          .insert([normalizedForm]);

        if (error) {
          toast({ variant: "destructive", title: "Insert Error", description: error.message });
          return;
        }

        toast({ title: "✅ Strategy Added", description: "Strategy added to Supabase." });
      }

      // Reset form
      setIsFormOpen(false);
      setEditingStrategy(null);
      resetStrategyForm();

      // Refresh strategies list
      await fetchStrategies();

    } catch (err) {
      toast({ variant: "destructive", title: "Unexpected Error", description: err.message });
    }
  };

  const resetStrategyForm = () => {
    setFormData(initialStrategyFormData);
  };

  const openEditForm = (strategy) => {
    setEditingStrategy(strategy);
    // Ensure all fields from initialStrategyFormData are present, falling back to defaults if not in strategy object
    const strategyWithAllFields = { ...initialStrategyFormData, ...strategy };
    setFormData(strategyWithAllFields);
    setIsFormOpen(true);
  };

  // Fixed delete strategy function
  const deleteStrategy = async (id) => {
    console.log("deleteStrategy called with id:", id);
    
    if (!id) {
      toast({
        variant: "destructive",
        title: "Delete Error",
        description: "Invalid strategy ID",
      });
      return;
    }

    try {
      console.log("Attempting to delete from Supabase...");
      
      // Delete from Supabase database
      const { data, error } = await supabase
        .from("strategies")
        .delete()
        .eq("id", id);

      console.log("Supabase delete response:", { data, error });

      if (error) {
        console.error("Supabase error:", error);
        toast({
          variant: "destructive",
          title: "Delete Error",
          description: error.message,
        });
        return;
      }

      console.log("Delete successful, updating local state...");
      
      // Update local state after successful deletion
      setStrategies(prevStrategies => prevStrategies.filter(s => s.id !== id));
      
      toast({
        title: "Deleted!",
        description: "Strategy removed successfully.",
      });

    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: err.message,
      });
    }
  };

  const handleAddAdminUser = async (e) => {
    e.preventDefault();

    if (!newAdminEmail || !newAdminPassword || !newAdminUsername) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields for the new admin user.",
      });
      return;
    }

    // 1. Sign up the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: newAdminEmail,
      password: newAdminPassword,
      options: {
        data: {
          username: newAdminUsername,
          role: "admin",
          is_subscribed: false,
        },
      },
    });

    if (error) {
      toast({ variant: "destructive", title: "Supabase Error", description: error.message });
      return;
    }

    const newUser = data?.user;
    if (!newUser) return;

    // 2. Register user on Mattermost
    const mmRegisterRes = await fetch(`${MATTERMOST_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({
        email: newAdminEmail,
        username: newAdminUsername,
        password: newAdminPassword,
      }),
    });

    const mmUser = await mmRegisterRes.json();

    if (!mmRegisterRes.ok) {
      toast({
        variant: "destructive",
        title: "Mattermost Error",
        description: mmUser.message || "Failed to create Mattermost user",
      });
      return;
    }

    // 3. Add to Mattermost Team
    const teamRes = await fetch(`${MATTERMOST_BASE_URL}/teams/${TEAM_ID}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ team_id: TEAM_ID, user_id: mmUser.id }),
    });

    if (!teamRes.ok) {
      const errData = await teamRes.json();
      toast({
        variant: "destructive",
        title: "Team Join Error",
        description: errData.message || "Failed to join Mattermost team",
      });
      return;
    }

    // 4. Add to Mattermost Channel
    const channelRes = await fetch(`${MATTERMOST_BASE_URL}/channels/${CHANNEL_ID}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ user_id: mmUser.id }),
    });

    if (!channelRes.ok) {
      const errData = await channelRes.json();
      toast({
        variant: "destructive",
        title: "Channel Join Error",
        description: errData.message || "Failed to join Mattermost channel",
      });
      return;
    }

    // 5. Create Personal Access Token
    const tokenRes = await fetch(`${MATTERMOST_BASE_URL}/users/${mmUser.id}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ description: "Admin PAT" }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      toast({
        variant: "destructive",
        title: "Token Creation Error",
        description: tokenData.message || "Failed to create personal token",
      });
      return;
    }

    // 6. Store everything in Supabase `profiles`
    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: newUser.id,
        email: newAdminEmail,
        username: newAdminUsername,
        role: "admin",
        is_subscribed: false,
        mattermost_user_id: mmUser.id,
        mattermost_token: tokenData.token,
      },
    ]);

    if (insertError) {
      toast({
        variant: "destructive",
        title: "Supabase Insert Error",
        description: insertError.message,
      });
      return;
    }

    toast({
      title: "Success!",
      description: `Admin user ${newAdminUsername} created successfully and linked to Mattermost.`,
    });

    setNewAdminEmail("");
    setNewAdminUsername("");
    setNewAdminPassword("");
    setShowNewAdminPassword(false);

    fetchAdminUsers();
  };

  const riskIcons = {
    low: <Shield className="h-4 w-4 mr-2 text-emerald-500" />,
    medium: <TrendingUp className="h-4 w-4 mr-2 text-amber-500" />,
    high: <Flame className="h-4 w-4 mr-2 text-rose-500" />,
  };

  const topBlockchains = [
    "Ethereum", "Polygon", "BNB Chain", "Solana", "Avalanche", 
    "Arbitrum", "Optimism", "Fantom", "Cosmos", "Near (Aurora)", "Polkadot", "Tron", "Cardano"
  ];

  if (checkingAuth) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient">Admin Panel</h1>
        <Button onClick={() => { setIsFormOpen(true); setEditingStrategy(null); resetStrategyForm(); }} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="h-5 w-5" /> Add New Strategy
        </Button>
      </motion.div>

      {isFormOpen && (
        <StrategyForm
          formData={formData}
          editingStrategy={editingStrategy}
          handleInputChange={handleInputChange}
          handleRiskChange={handleRiskChange}
          handleBlockchainChange={handleBlockchainChange}
          handleStrategyTypeChange={handleStrategyTypeChange}
          handleComplexityChange={handleComplexityChange}
          handleSmartContractRiskChange={handleSmartContractRiskChange}
          handleImpermanentLossRiskChange={handleImpermanentLossRiskChange}
          availableBlockchains={topBlockchains}
          handleStepChange={handleStepChange}
          addStep={addStep}
          removeStep={removeStep}
          handleSubmit={handleSubmitStrategy}
          resetForm={resetStrategyForm}
          setIsFormOpen={setIsFormOpen}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-border bg-card p-0">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold mb-2 flex items-center"><ListChecks className="mr-3 h-8 w-8 text-primary"/>Manage Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              {strategies.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No strategies found. Add some to get started!</p>
              ) : (
                <div className="space-y-4">
                  {strategies.map((strategy) => (
                    <StrategyListItem
                      key={strategy.id}
                      strategy={strategy}
                      openEditForm={openEditForm}
                      deleteStrategy={deleteStrategy}
                      riskIcons={riskIcons}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center"><Users className="mr-3 h-7 w-7 text-primary"/>Current Admin Users</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {adminUsers.length === 0 ? (
                <p className="text-muted-foreground text-center p-6">No admin or worker users found.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {adminUsers.map((user) => (
                    <li key={user.email} className="p-4 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium text-card-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.username || 'N/A'}</p>
                      </div>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize flex items-center gap-1">
                        <UserCog className="h-3 w-3"/>
                        {user.role}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center"><UserPlus className="mr-3 h-7 w-7 text-primary"/>Create New Admin User</CardTitle>
              <CardDescription>This creates an admin user in Supabase and Mattermost.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddAdminUser} className="space-y-4">
                <div>
                  <Label htmlFor="newAdminEmail">Email</Label>
                  <Input 
                    id="newAdminEmail" 
                    type="email" 
                    value={newAdminEmail} 
                    onChange={(e) => setNewAdminEmail(e.target.value)} 
                    placeholder="admin@example.com"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="newAdminUsername">Username</Label>
                  <Input 
                    id="newAdminUsername" 
                    type="text" 
                    value={newAdminUsername} 
                    onChange={(e) => setNewAdminUsername(e.target.value)} 
                    placeholder="AdminUser123"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="newAdminPassword">Password</Label>
                  <div className="relative">
                    <Input 
                      id="newAdminPassword" 
                      type={showNewAdminPassword ? "text" : "password"} 
                      value={newAdminPassword} 
                      onChange={(e) => setNewAdminPassword(e.target.value)} 
                      placeholder="••••••••"
                      required 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowNewAdminPassword(!showNewAdminPassword)}
                    >
                      {showNewAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">Create Admin</Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground text-center w-full">Admin users will be created in both Supabase and Mattermost.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;