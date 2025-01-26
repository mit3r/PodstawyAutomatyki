export default function NoInput(props: { value: number; postfix: string }) {
  return (
    <div className="w-20 rounded-md text-center border-2">
      {props.value}
      {props.postfix}
    </div>
  );
}
