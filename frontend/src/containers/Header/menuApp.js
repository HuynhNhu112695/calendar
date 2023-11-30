export const adminMenu = [
    { //trang chủ
        name: 'menu.admin.home-manage.header',
        menus: [
            { name: 'menu.admin.home-manage.home', link: '/' },
            { name: 'menu.admin.home-manage.calendar', link: '/system/calendar-manage' },
            { name: 'menu.admin.home-manage.deadline', link: '/system/deadline-manage' }
        ]
    },
    { //quản lý người dùng
        name: 'menu.admin.manage-user.header',
        menus: [{
            name: 'menu.admin.manage-user.crud-user', link: '/system/user-manage'
        }]

    },
    { //quản lý nhân viên
        name: 'menu.admin.manage-staff.header',
        menus: [
            { name: 'menu.admin.manage-staff.crud-staff', link: '/system/staff-manage' },
            { name: 'menu.admin.manage-staff.rest-schedule', link: '/system/rest-schedule' },
            { name: 'menu.admin.manage-staff.salary-staff', link: '/system/salary-manage' }
        ]
    },
    { //quản lý khách hàng
        name: 'menu.admin.manage-customer.header',
        menus: [{
            name: 'menu.admin.manage-customer.crud-customer', link: '/system/customer-manage'
        }]
    },
    { //quản lý sản phẩm
        name: 'menu.admin.manage-product.header',
        menus: [
            { name: 'menu.admin.manage-product.crud-product', link: '/system/product-manage' },
            { name: 'manage-product.unitManage', link: '/system/unit-manage' },
            { name: 'manage-product.buyPro', link: '/system/buy-product-manage' }
        ]
    },
    { //quản lý dịch vụ
        name: 'menu.admin.manage-service.header',
        menus: [
            { name: 'menu.admin.manage-service.crud-service', link: '/system/service-manage' },
            { name: 'menu.admin.manage-service.crud-type', link: '/system/type-manage' }
        ]
    },
    { //quản lý đơn hàng
        name: 'menu.admin.manage-order.header',
        menus: [
            { name: 'menu.admin.manage-order.crud-order', link: '/system/order-manage' },
            { name: 'menu.admin.manage-order.call-booking', link: '/system/call-booking' }
        ]
    },
    // { //quản lý thuế
    //     name: 'menu.admin.manage-tax.header',
    //     menus: [{
    //         name: 'menu.admin.manage-tax.crud-tax', link: '/system/tax-manage'
    //     }]
    // }
];