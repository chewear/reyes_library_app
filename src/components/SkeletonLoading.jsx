import { Box, Skeleton } from "@mui/material";

export default function SkeletonLoading() {
    return (
        <Box sx={{ width: 230, height: 300, display: "flex", flexDirection: "column", gap: 1 }}>
            <Skeleton 
                variant="rectangular" 
                width={230} 
                height={250} 
                sx={{ borderRadius: 1 }}
            />
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={20} />
        </Box>
    );
}
