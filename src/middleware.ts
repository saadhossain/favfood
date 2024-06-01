export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/account/:path*",
        "/admin/dashboard/:path*",
        "/checkout",
        "/api/orders/:path*",
        "/api/users/:path*",
        "/api/payment-intent",
    ]
}