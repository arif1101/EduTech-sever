export declare const AdminService: {
    getDashboardData: () => Promise<{
        stats: {
            activeCourses: number;
            totalRevenue: number;
            enrolledStudents: number;
            totalBooks: number;
            avgCourseRating: number;
            totalStudents: number;
        };
        charts: {
            enrollmentTrend: any[];
            coursePopularity: any[];
        };
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map