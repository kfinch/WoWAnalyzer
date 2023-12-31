import SPELLS from 'common/SPELLS';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import EventLinkNormalizer, { EventLink } from 'parser/core/EventLinkNormalizer';
import { EventType, HasRelatedEvent, ResourceChangeEvent } from 'parser/core/Events';
import { Options } from 'parser/core/Module';

export const ADDED_TO_OP = 'AddedToOverflowingPower';
export const STORED_CP = 'StoredComboPoint';

export const REDEEMED_BY = 'RedeemedBy';
export const REDEEMED_CP = 'RedeemedComboPoint';

const BUFFER_MS = 50;
const MAX_STORE_TIME_MS = 30_000;

const EVENT_LINKS: EventLink[] = [
  {
    linkRelation: STORED_CP,
    linkingEventId: SPELLS.OVERFLOWING_POWER_BUFF.id,
    linkingEventType: [EventType.ApplyBuff, EventType.ApplyBuffStack],
    reverseLinkRelation: ADDED_TO_OP,
    referencedEventId: null,
    referencedEventType: EventType.ResourceChange,
    maximumLinks: 1,
    additionalCondition: (le, re) => {
      return (re as ResourceChangeEvent).resourceChangeType === RESOURCE_TYPES.COMBO_POINTS.id;
    },
    forwardBufferMs: BUFFER_MS,
    backwardBufferMs: BUFFER_MS,
  },
  {
    linkRelation: REDEEMED_BY,
    linkingEventId: SPELLS.OVERFLOWING_POWER_BUFF.id,
    linkingEventType: [EventType.ApplyBuff, EventType.ApplyBuffStack],
    reverseLinkRelation: REDEEMED_CP,
    referencedEventId: SPELLS.OVERFLOWING_POWER_ENERGIZE.id,
    referencedEventType: EventType.ResourceChange,
    forwardBufferMs: MAX_STORE_TIME_MS, // big forward scan, but maximum links makes us stop after finding first
    maximumLinks: 1,
  },
];

/**
 * Berserk allows you to 'store' up to 3 combo points over the cap.
 * This shows in events as a wasted combo point and at the same timestamp a stack added to 'Overflowing Power'.
 *
 * First we link the builder ResourceChange (with waste) to the added stack of OP - detecting the CP is 'stored'.
 *
 * Next, we link the added stack of OP to the following energize when the stored CP is 'redeemed'.
 * Linking to the redemption event helps us avoid double counts, and also lets us detect when the redemption
 * never happens due to Berserk expiring.
 */
export default class OverflowingPowerLinkNormalizer extends EventLinkNormalizer {
  constructor(options: Options) {
    super(options, EVENT_LINKS);
  }
}

/** Checks if a resource change event contributed to overflowing power (and so wasn't wasted) */
export function addedToOverflowingPower(event: ResourceChangeEvent): boolean {
  return HasRelatedEvent(event, ADDED_TO_OP);
}
