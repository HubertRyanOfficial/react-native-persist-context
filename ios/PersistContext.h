
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPersistContextSpec.h"

@interface PersistContext : NSObject <NativePersistContextSpec>
#else
#import <React/RCTBridgeModule.h>

@interface PersistContext : NSObject <RCTBridgeModule>
#endif

@end
