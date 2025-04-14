
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean;
}

const LogoutButton = ({ 
  children, 
  showIcon = true, 
  ...props 
}: LogoutButtonProps) => {
  const { logout } = useAuth();
  
  return (
    <Button 
      onClick={logout} 
      variant={props.variant || "outline"} 
      {...props}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      {children || "Logout"}
    </Button>
  );
};

export default LogoutButton;
