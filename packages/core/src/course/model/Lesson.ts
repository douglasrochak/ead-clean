import Duration from "../../shared/Duration";
import Entity, { EntityProps } from "../../shared/Entity";
import Order from "../../shared/Order";
import SimpleText from "../../shared/SimpleText";
import Url from "../../shared/Url";

export interface LessonProps extends EntityProps {
  name: string;
  video: string;
  duration: number;
  visible: boolean;
  order: number;
}

export default class Lesson extends Entity<Lesson, LessonProps> {
  readonly name: SimpleText
  readonly video: Url
  readonly duration: Duration
  readonly visible: boolean
  readonly order: Order

  constructor(props: LessonProps) {
    super(props)
    this.name = new SimpleText(props.name, 3, 80, "name", "lesson")
    this.video = new Url(props.video!, "video", "lesson")
    this.visible = props.visible ?? true
    this.duration = new Duration(props.duration, props.visible ? 1 : 0, "duration", "lesson")
    this.order = new Order(props.order ?? 1, "order", "lesson")
}
}
