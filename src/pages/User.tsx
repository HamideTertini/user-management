import { useState, useMemo } from "react";
import {
  Layout,
  Input,
  Button,
  Space,
  Row,
  Col,
  Modal,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery, type User } from "@/store/api/usersApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addLocalUser,
  updateLocalUser,
  deleteLocalUser,
  setSearchQuery,
  setSortConfig,
} from "@/store/slices/localUsersSlice";
import UserCard from "@/components/UserCard";
import UserForm from "@/components/UserForm";

const { Content } = Layout;
const { Title, Text } = Typography;

const Users = () => {
  const { data: apiUsers = [], isLoading, error } = useGetUsersQuery();

  const dispatch = useAppDispatch();
  const { localUsers, searchQuery, sortBy, sortOrder } = useAppSelector(
    (state) => state.localUsers
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [modal, contextHolder] = Modal.useModal();


  const allUsers = useMemo(() => {
    return [...localUsers, ...apiUsers];
  }, [localUsers, apiUsers]);


  const filteredAndSortedUsers = useMemo(() => {
    let filtered = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = "";
        let bValue = "";

        switch (sortBy) {
          case "name":
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case "email":
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          case "company":
            aValue = a.company?.name?.toLowerCase() || "";
            bValue = b.company?.name?.toLowerCase() || "";
            break;
          default:
            return 0;
        }

        if (sortOrder === "ascend") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [allUsers, searchQuery, sortBy, sortOrder]);


  const handleAddUser = async (userData: User) => {
    try {
      dispatch(addLocalUser(userData));
      setIsModalOpen(false);
      message.success("User added successfully!");
    } catch {
      message.error("Failed to add user");
    }
  };

  const handleUpdateUser = async (userData: User) => {
    try {
      dispatch(updateLocalUser(userData));
      setIsModalOpen(false);
      setEditingUser(undefined);
      message.success("User updated successfully!");
    } catch {
      message.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          dispatch(deleteLocalUser(id));
          message.success("User deleted successfully!");
        } catch {
          message.error("Failed to delete user");
        }
      },
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  const handleSortChange = (value: string) => {
    if (value) {
      const currentSortBy = value as "name" | "email" | "company";
      const newSortOrder =
        sortBy === currentSortBy && sortOrder === "ascend"
          ? "descend"
          : "ascend";
      dispatch(setSortConfig({ sortBy: currentSortBy, sortOrder: newSortOrder }));
    } else {
      dispatch(setSortConfig({ sortBy: null, sortOrder: "ascend" }));
    }
  };

  if (error) {
    message.error("Failed to fetch users");
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Content style={{ padding: "32px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <Title
              level={2}
              style={{
                margin: "0 0 8px 0",
                background: "linear-gradient(135deg, #3b82f6, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              User Management
            </Title>
            <Text type="secondary">
              Manage and organize your users efficiently
            </Text>
          </div>

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={14}>
                <Input
                  placeholder="Search by name or email..."
                  prefix={<SearchOutlined />}
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setSearchQuery(e.target.value))
                  }
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Col>

              <Col xs={12} sm={12} md={6} lg={5}>
                <Select
                  placeholder="Sort by..."
                  value={sortBy || undefined}
                  onChange={handleSortChange}
                  size="large"
                  style={{ width: "100%", borderRadius: 8 }}
                  suffixIcon={<SortAscendingOutlined />}
                  allowClear
                >
                  <Select.Option value="name">Name</Select.Option>
                  <Select.Option value="email">Email</Select.Option>
                  <Select.Option value="company">Company</Select.Option>
                </Select>
              </Col>

              <Col xs={12} sm={12} md={6} lg={5}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                  size="large"
                  block
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
                    border: "none",
                    borderRadius: 8,
                  }}
                >
                  Add User
                </Button>
              </Col>
            </Row>

            {isLoading ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <Spin size="large" />
              </div>
            ) : (
              <>
                <Text type="secondary">
                  Showing {filteredAndSortedUsers.length} of {allUsers.length} users
                </Text>
                <Row gutter={[24, 24]}>
                  {filteredAndSortedUsers.map((user) => (
                    <Col xs={24} sm={12} lg={8} key={user.id}>
                      <UserCard
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDeleteUser}
                      />
                    </Col>
                  ))}
                </Row>
                {filteredAndSortedUsers.length === 0 && (
                  <div style={{ textAlign: "center", padding: "80px 0" }}>
                    <Text type="secondary" style={{ fontSize: 18 }}>
                      No users found
                    </Text>
                  </div>
                )}
              </>
            )}
          </Space>

          <Modal
            title={editingUser ? "Edit User" : "Add New User"}
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
            width={800}
            style={{ top: 20 }}
          >
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? handleUpdateUser : handleAddUser}
              onCancel={handleModalClose}
            />
          </Modal>
          {contextHolder}
        </div>
      </Content>
    </Layout>
  );
};

export default Users;
