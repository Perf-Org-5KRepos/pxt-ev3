/// <reference path="./staticView.ts" />

namespace pxsim.visuals {

    export const MOTOR_ROTATION_FPS = 32;

    export class MediumMotorView extends StaticModuleView implements LayoutElement {

        private static ROTATING_ECLIPSE_ID = "Hole";

        private hasPreviousAngle: boolean;
        private previousAngle: number;

        private lastMotorAnimationId: any;

        constructor(port: number) {
            super(MEDIUM_MOTOR_SVG, "medium-motor", NodeType.MediumMotor, port);
        }

        public getPaddingRatio() {
            return 1 / 10;
        }

        updateState() {
            const motorState = ev3board().getMotors()[this.port];
            if (!motorState) return;
            const speed = motorState.getSpeed();
            if (this.lastMotorAnimationId) cancelAnimationFrame(this.lastMotorAnimationId);

            if (!speed) return;
            this.setMotorAngle(motorState.getAngle());
        }

        private setMotorAngle(angle: number) {
            const holeEl = this.content.getElementById(this.normalizeId(MediumMotorView.ROTATING_ECLIPSE_ID))
            const width = 47.9;
            const height = 47.2;
            const transform = `translate(-1.5 -1.49) rotate(${angle} ${width / 2} ${height / 2})`;
            holeEl.setAttribute("transform", transform);
        }
    }
}