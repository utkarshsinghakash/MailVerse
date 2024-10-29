import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { EMAIL_API_ENDPOINT } from "../utils/constant";
import { Button, Input } from "@mui/material";
import styled from "styled-components";

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("1");
    e.preventDefault();
    try {
      console.log("2");
      dispatch(setLoading(true));
      const res = await axios.post(
        `${EMAIL_API_ENDPOINT}/register`,
        signupInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Field>
          <Label>Full Name</Label>
          <StyledInput
            type="text"
            placeholder="Enter your name"
            name="fullname"
            value={signupInput.fullname}
            onChange={changeEventHandler}
          />
        </Field>
        <Field>
          <Label>Email</Label>
          <StyledInput
            type="email"
            placeholder="Enter your email"
            name="email"
            value={signupInput.email}
            onChange={changeEventHandler}
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <StyledInput
            type="password"
            placeholder="Enter your password"
            name="password"
            value={signupInput.password}
            onChange={changeEventHandler}
          />
        </Field>
        <StyledButton type="submit">
          {loading ? "Please wait..." : "Sign Up"}
        </StyledButton>
        <Text>
          Already have an account? <StyledLink to="/login">Login</StyledLink>
        </Text>
      </FormContainer>
    </Wrapper>
  );
};

export default Signup;

// Styled Components

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #4fd1c5, #4299e1);
  padding: 1rem;
`;

const FormContainer = styled.form`
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.75rem;
  color: #4299e1;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #4a5568;
  display: block;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0px 0px 0px 2px rgba(66, 153, 225, 0.3);
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 0.75rem;
  background-color: #4299e1 !important;
  color: white !important;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2b6cb0 !important;
  }
`;

const Text = styled.span`
  display: block;
  text-align: center;
  font-size: 0.875rem;
  color: #718096;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: #4299e1;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
