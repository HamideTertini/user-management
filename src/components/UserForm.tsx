import { Form, Input, Button, Space, Row, Col, Typography } from "antd";
import { User } from "@/store/api/usersApi";

const { Title } = Typography;
interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  companyCatchPhrase: string;
  companyBs: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface UserFormProps {
  user?: User;
  onSubmit: (data: User) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: UserFormValues) => {
    const userData: User = {
      id: user?.id || Date.now(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      website: values.website,
      company: {
        name: values.companyName,
        catchPhrase: values.companyCatchPhrase,
        bs: values.companyBs,
      },
      address: {
        street: values.street,
        suite: values.suite,
        city: values.city,
        zipcode: values.zipcode,
      },
    };
    onSubmit(userData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={
        user
          ? {
              name: user.name,
              email: user.email,
              phone: user.phone,
              website: user.website,
              companyName: user.company.name,
              companyCatchPhrase: user.company.catchPhrase,
              companyBs: user.company.bs,
              street: user.address.street,
              suite: user.address.suite,
              city: user.address.city,
              zipcode: user.address.zipcode,
            }
          : {}
      }
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Name is required" },
              { max: 100, message: "Name is too long" },
            ]}
          >
            <Input placeholder="John Doe" size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email address" },
              { max: 255, message: "Email is too long" },
            ]}
          >
            <Input type="email" placeholder="john@example.com" size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input placeholder="+1234567890" size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: "Website is required" }]}
          >
            <Input placeholder="example.com" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: 16, marginBottom: 16 }}>
        Company Information
      </Title>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Company name is required" }]}
          >
            <Input placeholder="Company Inc." size="large" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Catch Phrase"
            name="companyCatchPhrase"
            rules={[{ required: true, message: "Catch phrase is required" }]}
          >
            <Input placeholder="Innovate. Create. Inspire." size="large" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Business"
            name="companyBs"
            rules={[{ required: true, message: "Business is required" }]}
          >
            <Input placeholder="Web development" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: 16, marginBottom: 16 }}>
        Address
      </Title>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Street is required" }]}
          >
            <Input placeholder="123 Main St" size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Suite"
            name="suite"
            rules={[{ required: true, message: "Suite is required" }]}
          >
            <Input placeholder="Apt. 4" size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "City is required" }]}
          >
            <Input placeholder="New York" size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Zipcode"
            name="zipcode"
            rules={[{ required: true, message: "Zipcode is required" }]}
          >
            <Input placeholder="10001" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ marginTop: 24 }}>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button size="large" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
              border: 'none',
            }}
          >
            {user ? "Update User" : "Add User"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
