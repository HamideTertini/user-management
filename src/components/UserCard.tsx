import { Card, Button, Space, Typography} from "antd";
import { MailOutlined, BankOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { User } from "@/store/api/usersApi";

const { Text, Title } = Typography;

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Title level={4} style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
            {user.name}
          </Title>
          <Space size="small" style={{ color: '#6b7280' }}>
            <MailOutlined />
            <Text type="secondary" ellipsis style={{ maxWidth: '100%' }}>
              {user.email}
            </Text>
          </Space>
        </div>

        <div>
          <Space size="small">
            <BankOutlined style={{ color: '#3b82f6' }} />
            <Text strong style={{ color: '#374151' }}>
              {user.company.name}
            </Text>
          </Space>
        </div>

        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/user/${user.id}`)}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
              border: 'none',
              borderRadius: 8
            }}
          >
            View Details
          </Button>
           <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(user)}
            style={{ borderRadius: 8 }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(user.id)}
            style={{ borderRadius: 8 }}
          />
        </Space>
      </Space>
      </Space>
    </Card>
  );
};

export default UserCard;
