import { NextResponse } from "next/server";

const DATA_SOURCE_URL: string = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

// function to get todos
export async function GET() {
	const res = await fetch(DATA_SOURCE_URL);

	const todos: Todo[] = await res.json();

	return NextResponse.json(todos);
}

// function to add todos
export async function POST(request: Request) {
	const { userId, title }: Partial<Todo> = await request.json();

	if (!userId || !title) {
		return NextResponse.json({ message: "Missing required details" });
	}

	const res = await fetch(DATA_SOURCE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			API_KEY: API_KEY,
			body: JSON.stringify({ userId, title, completed: false }),
		},
	});

	const data: Todo = await res.json();
	console.log(data);

	return NextResponse.json({ ...data, userId, title, completed: false });
}
// function to change todos
export async function PUT(request: Request) {
	const { userId, id, completed, title }: Todo = await request.json();

	if (!userId || !title || !id || typeof completed !== "boolean") {
		return NextResponse.json({ message: "Missing required details" });
	}

	const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			API_KEY: API_KEY,
			body: JSON.stringify({ userId, title, completed }),
		},
	});

	const data: Todo = await res.json();
	console.log(data);

	return NextResponse.json({ ...data, userId, title, completed });
}

// function to delete todos
export async function DELETE(request: Request) {
	const { id }: Partial<Todo> = await request.json();

	if (!id) {
		return NextResponse.json({ message: "Id is required" });
	}

	await fetch(`${DATA_SOURCE_URL}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"API-KEY": API_KEY,
		},
	});

	return NextResponse.json({ message: `Todos ${id}  deleted successfully` });
}
