import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDatafromToken(request: NextRequest) {
try {
    const token = request.cookies.get("token")?.value || "";
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.id;
} catch (error) {
console.error("Error in extracting data from token: ", error);
throw new Error("Error in extracting data from token");
}
} 