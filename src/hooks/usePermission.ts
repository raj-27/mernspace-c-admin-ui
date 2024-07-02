export const usePermission = (roles: string[]) => {
    const _hasPermission = (role: string) => {
        return roles.includes(role);
    };
    return {
        isAllowed: _hasPermission,
    };
};
