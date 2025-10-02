import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <UserOutlined style={{ fontSize: 24, color: 'white' }} />
        </div>
        <Title level={4} style={{ margin: 0, color: 'white' }}>
          User Management
        </Title>
      </Link>
    </Header>
  );
};

export default Navbar;
