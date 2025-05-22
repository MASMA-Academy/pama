// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import { request, response } from "express";

type request = express.Request;
type response = express.Response;

export const getFamilyDetails = (req: request, res: response) => {
  const familyDetails = [
    { name: "John Doe", age: 30, role: "Father" },
    { name: "Jane Doe", age: 28, role: "Mother" },
    { name: "Jimmy Doe", age: 5, role: "Son" },
  ];

  res.status(200).json(familyDetails);
};