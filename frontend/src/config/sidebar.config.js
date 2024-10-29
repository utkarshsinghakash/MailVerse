import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const SIDEBAR_DATA = [
  {
    name: "inbox",
    title: "Inbox",
    icon: PhotoSizeSelectActualOutlinedIcon,
  },
  {
    name: "starred",
    title: "Starred",
    icon: StarBorderPurple500OutlinedIcon,
  },
  {
    name: "sent",
    title: "Sent",
    icon: SendOutlinedIcon,
  },
  {
    name: "drafts",
    title: "Drafts",
    icon: InsertDriveFileOutlinedIcon,
  },
  {
    name: "bin",
    title: "Bin",
    icon: DeleteOutlineOutlinedIcon,
  },
  {
    name: "allmails",
    title: "All Mail",
    icon: EmailOutlinedIcon,
  },
];
