import { useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = (props) => {
	// UI component phân trang

	// Số item mà server trả ra một lần
	const defaultGet = props.defaultGet;

	// Nút phân trang hiện tại đang được chọn (active)
	const [pagActive, setPagActive] = useState(1);

	// Số nút phân trang sẽ render lên
	let pages = 0;

	// Một trang render defaultGet bài viết, nếu có lẻ ra thì phân nó qua trang mới
	if (props.count % defaultGet !== 0) {
		// Tổng số trang cần render
		pages = Math.ceil(props.count / defaultGet);
	} else pages = props.count / defaultGet;

	// Array chứa các UI nút phân trang
	let pagItems = [];

    // Các nút hiển thị nôi dung là số 1 -> pages (tổng số trang)
	for (let number = 1; number <= pages; number++) {
		pagItems.push(
			<Pagination.Item
				key={number}
				active={number === pagActive}
				onClick={() => {
					props.getPosts(number);
					setPagActive(number);
				}}
			>
				{number}
			</Pagination.Item>
		);
	}

	const pagination = (
		<>
			<Pagination>
				<Pagination.First
					onClick={() => {
						props.getPosts(1);
						setPagActive(1);
					}}
				/>
				<Pagination.Prev
                    // Server ko trả ra trang trước thì disable nút 
					disabled={props.previous == null ? true : false}
					onClick={() => {
						let num;
						// Do trang đầu tiên không có params page=số
						if (pagActive === 2) num = 1;
						else num = props.previous.substr(props.previous.length - 1);
						props.getPosts(num);
						setPagActive(parseInt(num));
					}}
				/>
				{pagItems}
				<Pagination.Next
                    // Server ko trả ra trang sau thì disable nút 
					disabled={props.next == null ? true : false}
					onClick={() => {
						let num = props.next.substr(props.next.length - 1);
						props.getPosts(num);
						setPagActive(parseInt(num));
					}}
				/>
				<Pagination.Last
					onClick={() => {
						props.getPosts(pages);
						setPagActive(pages);
					}}
				/>
			</Pagination>
		</>
	);
    // Trả về một UI component hoàn chỉnh
	return pagination;
};

export default PaginationBar;
