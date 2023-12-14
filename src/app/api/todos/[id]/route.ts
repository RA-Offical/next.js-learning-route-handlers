import { NextResponse } from "next/server";

// data source
const DATA_SOURCE_URL: string = "https://jsonplaceholder.typicode.com/todos";

// dynamic get function
export async function GET(request: Request) {
	const id = request.url.slice(request.url.lastIndexOf("/") + 1);

	const res = await fetch(`${DATA_SOURCE_URL}/${id}`);

	const todo: Todo = await res.json();

	if (!todo) {
		return NextResponse.json({ message: "Todo not found" });
	}

	return NextResponse.json(todo);
}
