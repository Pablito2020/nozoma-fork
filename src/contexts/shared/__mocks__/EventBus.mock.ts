/* eslint-disable jest/no-standalone-expect */

import { EventBus } from '@shared/domain/bus/event/EventBus';
import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { DomainEventSubscriber } from '@shared/domain/bus/event/DomainEventSubscriber';

export default class EventBusMock implements EventBus {
    private publishSpy = jest.fn();

    private static getDataFromDomainEvent(event: DomainEvent): any {
        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            eventId,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            occurredOn,
            ...attributes
        } = event;

        return attributes;
    }

    async publish(events: DomainEvent[]): Promise<void> {
        this.publishSpy(events);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
    addSubscribers(_subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        //
    }

    assertLastPublishedEventIs(expectedEvent: DomainEvent): void {
        const publishSpyCalls = this.publishSpy.mock.calls,
            lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1],
            lastPublishedEvent = lastPublishSpyCall[0][0];

        expect(publishSpyCalls.length)
            .toBeGreaterThan(0);

        expect(EventBusMock.getDataFromDomainEvent(expectedEvent))
            .toMatchObject(EventBusMock.getDataFromDomainEvent(lastPublishedEvent));
    }

    assertLastPublishedEventsAre(events: DomainEvent[]): void {
        const publishSpyCalls = this.publishSpy.mock.calls,
            lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1],
            lastPublishedEvents = lastPublishSpyCall[0];

        expect(publishSpyCalls.length)
            .toBeGreaterThan(0);
        expect(lastPublishedEvents)
            .toHaveLength(events.length);

        lastPublishedEvents.forEach((publishedEvent: DomainEvent, i: number) => {
            const expectedEvent = events[i];

            expect(EventBusMock.getDataFromDomainEvent(expectedEvent))
                .toMatchObject(EventBusMock.getDataFromDomainEvent(publishedEvent));
        });
    }

    assertEmptyPublished(): void {
        const publishSpyCalls = this.publishSpy.mock.calls,
            lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1],
            lastPublishedEvents = lastPublishSpyCall[0];

        expect(lastPublishedEvents)
            .toHaveLength(0);
    }

    assertNothingPublished(): void {
        const publishSpyCalls = this.publishSpy.mock.calls;

        expect(publishSpyCalls)
            .toHaveLength(0);
    }
}
