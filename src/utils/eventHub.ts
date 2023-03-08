import mitt, { Emitter } from "mitt";
type Events = {
  [key: string]: any;
};
const eventHub: Emitter<Events> = mitt<Events>();

export default eventHub;
