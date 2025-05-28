import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Edit3, Save, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient";

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        toast({ variant: "destructive", title: "Error", description: "User not found or not logged in." });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, email, username, role, is_subscribed")
        .eq("id", user.id)
        .single();

      if (profileError) {
        toast({ variant: "destructive", title: "Error", description: "Failed to fetch profile data." });
        return;
      }

      setCurrentUser(profile);
      setEditedUsername(profile.username || '');
      setEditedEmail(profile.email || '');
    };

    fetchUserProfile();
  }, [toast]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (currentUser && isEditing) {
      setEditedUsername(currentUser.username || '');
      setEditedEmail(currentUser.email || '');
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        username: editedUsername,
        email: editedEmail,
      })
      .eq("id", currentUser.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
      return;
    }

    setCurrentUser(prev => ({
      ...prev,
      username: editedUsername,
      email: editedEmail,
    }));

    toast({ title: 'Profile Updated', description: 'Your profile details have been successfully updated.' });
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Loading profile or not logged in...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden shadow-2xl glass-effect border-primary/20">
          <CardHeader className="bg-gradient-to-br from-primary/80 via-primary to-blue-600 p-8 text-primary-foreground">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">User Profile</CardTitle>
                <CardDescription className="text-primary-foreground/80">Manage your account information.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={handleEditToggle} className="text-primary-foreground hover:bg-primary-foreground/10">
                {isEditing ? <XCircle className="h-6 w-6" /> : <Edit3 className="h-6 w-6" />}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-muted-foreground flex items-center">
                  <User className="h-4 w-4 mr-2" /> Username
                </Label>
                {isEditing ? (
                  <Input id="username" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} className="mt-1" />
                ) : (
                  <p className="text-lg font-semibold mt-1">{currentUser.username || 'Not set'}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> Email Address
                </Label>
                {isEditing ? (
                  <Input id="email" type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="mt-1" />
                ) : (
                  <p className="text-lg font-semibold mt-1">{currentUser.email}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Shield className="h-4 w-4 mr-2" /> Role
                </Label>
                <p className="text-lg font-semibold mt-1 capitalize">
                  <Badge variant={currentUser.role === 'admin' ? 'destructive' : 'secondary'}>{currentUser.role}</Badge>
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" /> Subscription Status
                </Label>
                <p className="text-lg font-semibold mt-1 capitalize">
                  {currentUser.is_subscribed ? (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4 mr-1.5" /> Subscribed (Full Access)
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      <XCircle className="h-4 w-4 mr-1.5" /> Not Subscribed
                    </Badge>
                  )}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-border mt-6">
                <Button variant="outline" onClick={handleEditToggle}>Cancel</Button>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
