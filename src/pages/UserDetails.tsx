import { useParams, useNavigate } from "react-router-dom";
import { Layout, Button, Card, Space, Row, Col, Typography} from "antd";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  BankOutlined,
  EnvironmentOutlined,
  AimOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery } from "@/store/api/usersApi";
import { useAppSelector } from "@/store/hooks";

const { Content } = Layout;
const { Title, Text } = Typography;

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apiUsers = [] } = useGetUsersQuery();
  const { localUsers } = useAppSelector((state) => state.localUsers);

  const allUsers = [...localUsers, ...apiUsers];
  const user = allUsers.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        <Content style={{ padding: '80px 24px', textAlign: 'center' }}>
          <Title level={2}>User not found</Title>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
            size="large"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
              border: 'none',
            }}
          >
            Back to Users
          </Button>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Content style={{ padding: '32px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
            size="large"
            style={{ marginBottom: 24, borderRadius: 8 }}
          >
            Back to Users
          </Button>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card
                style={{
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
                }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      margin: '0 auto',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 40,
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                <Space>
                    <MailOutlined style={{ color: '#3b82f6', fontSize: 18 }} />
                <div>
                    <Text type="secondary" style={{ display: 'block', fontSize: 12 }}> Email  </Text>
                    <Text strong>{user.email}</Text>
                    </div>
             </Space>

                  <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'left' }}>
                    <div>
                      <Space>
                        <PhoneOutlined style={{ color: '#3b82f6', fontSize: 18 }} />
                        <div>
                          <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                            Phone
                          </Text>
                          <Text strong>{user.phone}</Text>
                        </div>
                      </Space>
                    </div>

                    <div>
                      <Space>
                        <GlobalOutlined style={{ color: '#3b82f6', fontSize: 18 }} />
                        <div>
                          <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                            Website
                          </Text>
                          <a
                            href={`https://${user.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#3b82f6' }}
                          >
                            {user.website}
                          </a>
                        </div>
                      </Space>
                    </div>
                  </Space>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card
                  style={{
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
                  }}
                >
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Space>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: 'rgba(59, 130, 246, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <BankOutlined style={{ fontSize: 20, color: '#3b82f6' }} />
                      </div>
                      <Title level={4} style={{ margin: 0 }}>
                        Company Information
                      </Title>
                    </Space>

                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      <div>
                        <Text type="secondary" style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
                          Company Name
                        </Text>
                        <Title level={5} style={{ margin: 0 }}>
                          {user.company.name}
                        </Title>
                      </div>

                      <Space>
                        <AimOutlined style={{ color: '#9333ea', fontSize: 18 }} />
                        <div>
                          <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                            Catch Phrase
                          </Text>
                          <Text italic>{user.company.catchPhrase}</Text>
                        </div>
                      </Space>

                      <Space>
                        <ShopOutlined style={{ color: '#9333ea', fontSize: 18 }} />
                        <div>
                          <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                            Business
                          </Text>
                          <Text>{user.company.bs}</Text>
                        </div>
                      </Space>
                    </Space>
                  </Space>
                </Card>

                <Card
                  style={{
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
                  }}
                >
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Space>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: 'rgba(147, 51, 234, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <EnvironmentOutlined style={{ fontSize: 20, color: '#9333ea' }} />
                      </div>
                      <Title level={4} style={{ margin: 0 }}>
                        Address
                      </Title>
                    </Space>

                    <Space direction="vertical" size="small">
                      <Text style={{ fontSize: 16 }}>
                        {user.address.suite}, {user.address.street}
                      </Text>
                      <Text style={{ fontSize: 16 }}>
                        {user.address.city}, {user.address.zipcode}
                      </Text>
                    </Space>
                  </Space>
                </Card>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default UserDetails;
